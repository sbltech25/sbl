import Report from '../models/Report.js';
import Project from '../models/Project.js';
import { uploadFile } from '../lib/cloudinary.js';
import { sendEmail } from '../lib/email.js';
import User from '../models/User.js';

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { 
      projectId, 
      projectCode,
      date,
      team,
      tasks,
      progress,
      challenges,
      actionTaken,
      helpNeeded,
      nextSteps,
      feedback,
      conclusion
    } = req.body;

    // Validate required fields
    if (!projectId || !projectCode || !date || !team || !tasks || !progress) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Handle file uploads if present
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResponse = await uploadFile(file);
        images.push({
          name: file.originalname,
          url: uploadResponse.url,
          caption: `Image ${images.length + 1}`
        });
      }
    }

    const report = await Report.create({
      projectId,
      projectCode,
      date,
      team,
      tasks,
      progress,
      challenges,
      actionTaken,
      helpNeeded,
      nextSteps,
      feedback,
      conclusion,
      images
    });

    // Send email notification to client
    const client = await User.findById(project.clientId);
    await sendEmail({
      to: client.email,
      subject: `New Progress Report for Project ${projectCode}`,
      text: `A new progress report has been uploaded for project ${project.name} (${projectCode}).\n\nTasks Completed: ${tasks}\nProgress: ${progress}\n\nPlease log in to your dashboard to view the full report.`,
      html: `<p>A new progress report has been uploaded for project <strong>${project.name} (${projectCode})</strong>.</p>
             <p><strong>Tasks Completed:</strong> ${tasks}</p>
             <p><strong>Progress:</strong> ${progress}</p>
             <p>Please log in to your dashboard to view the full report.</p>`
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
};

// Get all reports for a project
export const getProjectReports = async (req, res) => {
  try {
    const { projectId } = req.params;

    const reports = await Report.find({ projectId })
      .sort({ date: -1 });

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching project reports:', error);
    res.status(500).json({ message: 'Failed to fetch project reports', error: error.message });
  }
};

// Get report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id)
      .populate('projectId', 'name code');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Failed to fetch report', error: error.message });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Failed to delete report', error: error.message });
  }
};


// Download report
export const downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // In a real implementation, you would generate a PDF or return the file
    // For now, we'll return the report data as JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=report_${id}.json`);
    res.status(200).json(report);
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ message: 'Failed to download report', error: error.message });
  }
};