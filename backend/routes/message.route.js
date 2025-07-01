import express from 'express';
import {
  sendMessage,
  getProjectMessages,
  markMessageAsRead,
  getUnreadMessageCount
} from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/', protectRoute, upload.single('attachment'), sendMessage);
router.get('/project/:projectId', protectRoute, getProjectMessages);
router.put('/:messageId/read', protectRoute, markMessageAsRead);
router.get('/unread/count', protectRoute, getUnreadMessageCount);

export default router;