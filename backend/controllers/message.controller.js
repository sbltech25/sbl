import Message from '../models/Message.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';


// In message.controller.js
export const uploadMessageAttachment = async (req, res) => {
  try {
    const { file: base64File, type, name, mimeType } = req.body;

    if (!base64File) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    const uploadOptions = {
      folder: 'sbl-messages',
      resource_type: type === 'video' ? 'video' : 'auto',
    };

    // Construct the data URI for Cloudinary
    const dataUri = `data:${mimeType};base64,${base64File}`;

    const result = await cloudinary.uploader.upload(dataUri, uploadOptions);

    res.status(200).json({ 
      success: true, 
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        type,
        name: name || 'file',
        mimeType
      }
    });
  } catch (error) {
    console.error("Attachment upload error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to upload attachment",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { subject, text, receiverId, projectId, attachments = [] } = req.body;
    const senderId = req.user._id;

    // Validate required fields
    if (!subject || !text || !receiverId || !projectId) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    // Ensure attachments is an array
    const attachmentsArray = Array.isArray(attachments) ? attachments : [];

    // Validate each attachment
    const validatedAttachments = attachmentsArray.map(attachment => ({
      url: attachment.url || '',
      publicId: attachment.publicId || '',
      type: attachment.type || 'document',
      name: attachment.name || 'file',
      mimeType: attachment.mimeType || 'application/octet-stream'
    }));

    const message = await Message.create({
      subject,
      text,
      senderId,
      receiverId,
      projectId,
      attachments: validatedAttachments
    });

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: message 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Failed to send message', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getProjectMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({ projectId })
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching project messages:', error);
    res.status(500).json({ message: 'Failed to fetch project messages', error: error.message });
  }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Failed to mark message as read', error: error.message });
  }
};

// Get unread message count for user
export const getUnreadMessageCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const count = await Message.countDocuments({
      receiverId: userId,
      isRead: false
    });

    res.status(200).json({ success: true, data: count });
  } catch (error) {
    console.error('Error fetching unread message count:', error);
    res.status(500).json({ message: 'Failed to fetch unread message count', error: error.message });
  }
};