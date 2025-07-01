import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    projectCode: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    team: {
      type: String,
      required: true,
      trim: true
    },
    tasks: {
      type: String,
      required: true,
      trim: true
    },
    progress: {
      type: String,
      required: true,
      trim: true
    },
    challenges: {
      type: String,
      trim: true
    },
    actionTaken: {
      type: String,
      trim: true
    },
    helpNeeded: {
      type: String,
      trim: true
    },
    nextSteps: {
      type: String,
      trim: true
    },
    feedback: {
      type: String,
      trim: true
    },
    conclusion: {
      type: String,
      trim: true
    },
    images: [{
      name: String,
      url: String,
      caption: String
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster querying
reportSchema.index({ projectId: 1 });
reportSchema.index({ projectCode: 1 });
reportSchema.index({ date: -1 });

const Report = mongoose.model('Report', reportSchema);

export default Report;