import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    attachments: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, required: true },
          type: { type: String, required: true, enum: ['image', 'video', 'document'] },
          name: { type: String, required: true },
          mimeType: { type: String, required: true }
        }
      ],
      default: []
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

messageSchema.index({ projectId: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;