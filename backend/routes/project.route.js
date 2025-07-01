import express from 'express';
import {
  createProject,
  getClientProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProjectStatus
} from '../controllers/project.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/', protectRoute, upload.none(), createProject);
router.get('/client/:clientId', protectRoute, getClientProjects);
router.get('/:id', protectRoute, getProjectById);
router.put('/:id', protectRoute, upload.none(), updateProject);
router.delete('/:id', protectRoute, deleteProject);
router.put('/:id/status', protectRoute, updateProjectStatus);
export default router;