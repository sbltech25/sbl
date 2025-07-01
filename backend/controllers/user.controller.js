import User from '../models/User.js';
import Project from '../models/Project.js';

// Get all clients (non-admin users)
export const getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-password')
      .sort({ createdAt: -1 });

    // Get project counts for each client
    const clientsWithProjectCounts = await Promise.all(
      clients.map(async client => {
        const projectCount = await Project.countDocuments({ clientId: client._id });
        return {
          ...client.toObject(),
          projects: projectCount
        };
      })
    );

    res.status(200).json({ success: true, data: clientsWithProjectCounts });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Failed to fetch clients', error: error.message });
  }
};

// Update client status
export const updateClientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['new', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const client = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    console.error('Error updating client status:', error);
    res.status(500).json({ message: 'Failed to update client status', error: error.message });
  }
};

// Get client by ID
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await User.findById(id)
      .select('-password')
      .populate({
        path: 'projects',
        select: 'name code status startDate endDate'
      });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Failed to fetch client', error: error.message });
  }
};