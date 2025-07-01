import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    budget: {
      type: Number,
      default: 0
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    team: {
      type: String,
      default: 'Southern Basin Limited'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for messages
projectSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'projectId'
});

// Virtual for reports
projectSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'projectId'
});

// Virtual for gantt charts
projectSchema.virtual('ganttCharts', {
  ref: 'GanttChart',
  localField: '_id',
  foreignField: 'projectId'
});

const Project = mongoose.model('Project', projectSchema);

export default Project;