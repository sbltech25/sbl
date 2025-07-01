import GanttChart from '../models/GanttChart.js';
import Project from '../models/Project.js';

// Create a new Gantt chart
export const createGanttChart = async (req, res) => {
  try {
    const { projectId, title, tasks } = req.body;

    // Validate required fields
    if (!projectId || !title || !tasks || tasks.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Validate tasks
    const invalidTasks = tasks.some(task => !task.task || !task.month);
    if (invalidTasks) {
      return res.status(400).json({ message: 'All tasks must have a description and month' });
    }

    const ganttChart = await GanttChart.create({
      projectId,
      title,
      tasks
    });

    res.status(201).json({ success: true, data: ganttChart });
  } catch (error) {
    console.error('Error creating Gantt chart:', error);
    res.status(500).json({ message: 'Failed to create Gantt chart', error: error.message });
  }
};

// Get Gantt charts for a project
export const getProjectGanttCharts = async (req, res) => {
  try {
    const { projectId } = req.params;

    const ganttCharts = await GanttChart.find({ projectId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: ganttCharts });
  } catch (error) {
    console.error('Error fetching Gantt charts:', error);
    res.status(500).json({ message: 'Failed to fetch Gantt charts', error: error.message });
  }
};

// Update Gantt chart
export const updateGanttChart = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const ganttChart = await GanttChart.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!ganttChart) {
      return res.status(404).json({ message: 'Gantt chart not found' });
    }

    res.status(200).json({ success: true, data: ganttChart });
  } catch (error) {
    console.error('Error updating Gantt chart:', error);
    res.status(500).json({ message: 'Failed to update Gantt chart', error: error.message });
  }
};

// Delete Gantt chart
export const deleteGanttChart = async (req, res) => {
  try {
    const { id } = req.params;

    const ganttChart = await GanttChart.findByIdAndDelete(id);

    if (!ganttChart) {
      return res.status(404).json({ message: 'Gantt chart not found' });
    }

    res.status(200).json({ success: true, message: 'Gantt chart deleted successfully' });
  } catch (error) {
    console.error('Error deleting Gantt chart:', error);
    res.status(500).json({ message: 'Failed to delete Gantt chart', error: error.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { ganttId, taskId } = req.params;
    const { status } = req.body;

    const validStatuses = ['not-started', 'in-progress', 'paused', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ganttChart = await GanttChart.findById(ganttId);
    if (!ganttChart) {
      return res.status(404).json({ message: 'Gantt chart not found' });
    }

    const taskIndex = ganttChart.tasks.findIndex(t => t._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    ganttChart.tasks[taskIndex].status = status;
    ganttChart.tasks[taskIndex].updatedAt = new Date();
    
    await ganttChart.save();

    res.status(200).json({ 
      success: true, 
      data: ganttChart.tasks[taskIndex] 
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ 
      message: 'Failed to update task status', 
      error: error.message 
    });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const { ganttId, taskId } = req.params;

    const ganttChart = await GanttChart.findById(ganttId);
    if (!ganttChart) {
      return res.status(404).json({ message: 'Gantt chart not found' });
    }

    const task = ganttChart.tasks.find(t => t._id.toString() === taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ 
      message: 'Failed to fetch task', 
      error: error.message 
    });
  }
};