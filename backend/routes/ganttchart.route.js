import express from 'express';
import {
  createGanttChart,
  getProjectGanttCharts,
  updateGanttChart,
  deleteGanttChart,
  getTask,
  updateTaskStatus
} from '../controllers/ganttchart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createGanttChart);
router.get('/project/:projectId', protectRoute, getProjectGanttCharts);
router.put('/:id', protectRoute, updateGanttChart);
router.delete('/:id', protectRoute, deleteGanttChart);
router.get('/:ganttId/tasks/:taskId', protectRoute, getTask);
router.put('/:ganttId/tasks/:taskId/status', protectRoute, updateTaskStatus);

export default router;