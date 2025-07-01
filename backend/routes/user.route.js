import express from 'express';
import {
  getAllClients,
  updateClientStatus,
  getClientById
} from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/clients', protectRoute, getAllClients);
router.get('/clients/:id', protectRoute, getClientById);
router.put('/clients/:id/status', protectRoute, updateClientStatus);

export default router;