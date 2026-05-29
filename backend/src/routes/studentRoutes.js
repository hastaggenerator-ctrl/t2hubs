import express from 'express';
import { attendanceForStudent, dashboard, markAttendance, requestLeave, updateProfile } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/dashboard', dashboard);
router.patch('/profile', updateProfile);
router.post('/attendance/mark', markAttendance);
router.get('/attendance/:id', attendanceForStudent);
router.post('/leave', requestLeave);

export default router;

