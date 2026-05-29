import express from 'express';
import { attendanceForStudent, markAttendance } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/mark', markAttendance);
router.get('/student/:id', attendanceForStudent);

export default router;

