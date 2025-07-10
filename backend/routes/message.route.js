import express from 'express';
import {
  sendMessage,
  getProjectMessages,
  markMessageAsRead,
  getUnreadMessageCount,
  uploadMessageAttachment
} from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, sendMessage);
router.post('/upload', protectRoute, uploadMessageAttachment);
router.get('/project/:projectId', protectRoute, getProjectMessages);
router.put('/:messageId/read', protectRoute, markMessageAsRead);
router.get('/unread/count', protectRoute, getUnreadMessageCount);

export default router;