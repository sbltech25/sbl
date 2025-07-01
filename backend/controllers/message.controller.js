import Message from '../models/Message.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { uploadFile } from '../lib/cloudinary.js';
import { sendEmail } from '../lib/email.js';


export const sendMessage = async (req, res) => {
  try {
    const { subject, text, receiverId, projectId } = req.body;
    const senderId = req.user._id; // Ensure this is a string/ObjectId

    // Validate required fields
    if (!subject || !text || !receiverId || !projectId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Handle file upload if present
    let attachments = [];
    if (req.file) {
      const uploadResponse = await uploadFile(req.file);
      attachments.push({
        name: req.file.originalname,
        url: uploadResponse.url,
        type: req.file.mimetype
      });
    }

    const message = await Message.create({
      subject,
      text,
      senderId, // This should be a string/ObjectId
      receiverId, // This should be a string/ObjectId
      projectId, // This should be a string/ObjectId
      attachments
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
};

// Get all messages for a project
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