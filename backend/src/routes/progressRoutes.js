import express from 'express';
import { getProgress, updateProgress } from '../controllers/progressController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/update', protect, updateProgress);
router.get('/:studentId', protect, getProgress);
router.patch('/admin/update', protect, authorize('admin'), updateProgress);

export default router;

