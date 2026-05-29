import express from 'express';
import { analytics, attendanceReport, reviewLeave } from '../controllers/adminController.js';
import { createOne, deleteOne, getOne, list, updateOne } from '../controllers/crudController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import Attendance from '../models/Attendance.js';
import Certificate from '../models/Certificate.js';
import ContactMessage from '../models/ContactMessage.js';
import ContentBlock from '../models/ContentBlock.js';
import Internship from '../models/Internship.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Registration from '../models/Registration.js';
import Seminar from '../models/Seminar.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

const router = express.Router();
router.use(protect, authorize('admin'));

router.get('/analytics', analytics);
router.get('/attendance/reports', attendanceReport);
router.patch('/leave/:id', reviewLeave);

const resources = [
  ['students', User, 'enrolledInternships'],
  ['internships', Internship, 'applicants'],
  ['seminars', Seminar, 'registrations'],
  ['registrations', Registration, 'student internship seminar'],
  ['certificates', Certificate, 'student internship'],
  ['messages', ContactMessage, ''],
  ['attendance', Attendance, 'student internship'],
  ['leave-requests', LeaveRequest, 'student reviewedBy'],
  ['tasks', Task, 'internship'],
  ['content', ContentBlock, '']
];

resources.forEach(([path, Model, populate]) => {
  router.route(`/${path}`).get(list(Model, populate)).post(createOne(Model));
  router.route(`/${path}/:id`).get(getOne(Model, populate)).patch(updateOne(Model)).delete(deleteOne(Model));
});

export default router;
