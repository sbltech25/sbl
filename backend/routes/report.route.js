import express from 'express';
import {
  createReport,
  getProjectReports,
  getReportById,
  deleteReport,
  downloadReport
} from '../controllers/report.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/', protectRoute, upload.array('images', 5), createReport);
router.get('/project/:projectId', protectRoute, getProjectReports);
router.get('/:id', protectRoute, getReportById);
router.delete('/:id', protectRoute, deleteReport);
router.get('/:id/download', protectRoute, downloadReport);
export default router;