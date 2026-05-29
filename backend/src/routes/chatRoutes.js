import express from 'express';
import { getMessages, sendChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/send', sendChat);
router.get('/messages', getMessages);

export default router;

