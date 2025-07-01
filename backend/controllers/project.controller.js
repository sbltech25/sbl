import Project from '../models/Project.js';
import { uploadFile } from '../lib/cloudinary.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, code, description, startDate, endDate, budget, clientId } = req.body;

    // Validate required fields
    if (!name || !code || !startDate || !endDate || !clientId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if project code already exists
    const existingProject = await Project.findOne({ code });
    if (existingProject) {
      return res.status(400).json({ message: 'Project code already exists' });
    }

    const project = await Project.create({
      name,
      code,
      description,
      startDate,
      endDate,
      budget: parseFloat(budget) || 0,
      clientId
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};

// Get all projects for a client
export const getClientProjects = async (req, res) => {
  try {
    const { clientId } = req.params;

    const projects = await Project.find({ clientId })
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching client projects:', error);
    res.status(500).json({ message: 'Failed to fetch client projects', error: error.message });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('clientId', 'name email')
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } }
      })
      .populate({
        path: 'reports',
        options: { sort: { date: -1 } }
      })
      .populate('ganttCharts');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};

// Update project status
export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['not-started', 'in-progress', 'paused', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Failed to update project status', error: error.message });
  }
};