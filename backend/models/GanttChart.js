import mongoose from 'mongoose';

const ganttChartSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    tasks: [{
      task: {
        type: String,
        required: true,
        trim: true
      },
      month: {
        type: String,
        required: true,
        trim: true
      },
      completed: {
        type: Boolean,
        default: false
      }
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster querying
ganttChartSchema.index({ projectId: 1 });

const GanttChart = mongoose.model('GanttChart', ganttChartSchema);

export default GanttChart;