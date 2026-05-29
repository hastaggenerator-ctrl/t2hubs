import 'dotenv/config';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Internship from '../models/Internship.js';
import Seminar from '../models/Seminar.js';
import Registration from '../models/Registration.js';
import Certificate from '../models/Certificate.js';
import Task from '../models/Task.js';
import InternshipProgress from '../models/InternshipProgress.js';
import Notification from '../models/Notification.js';
import Attendance from '../models/Attendance.js';
import ContactMessage from '../models/ContactMessage.js';

await connectDB();
await Promise.all([
  User.deleteMany(), Internship.deleteMany(), Seminar.deleteMany(),
  Registration.deleteMany(), Certificate.deleteMany(), Task.deleteMany(), InternshipProgress.deleteMany(),
  Notification.deleteMany(), Attendance.deleteMany(), ContactMessage.deleteMany()
]);

const admin = await User.create({ name: 'T2Hubs Admin', email: 'admin@t2hubs.com', password: 'Admin@123', role: 'admin', phone: '9999999999' });
const student = await User.create({ name: 'Aditya Student', email: 'student@t2hubs.com', password: 'Student@123', role: 'student', college: 'Demo Institute', skills: ['React', 'Communication'] });

const internships = await Internship.insertMany([
  { title: 'Frontend Developer Intern', department: 'Engineering', description: 'Build responsive React components and dashboards.', skills: ['React', 'Tailwind', 'REST APIs'], duration: '8 Weeks', stipend: 'Performance Based', deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25), applicants: [student._id] },
  { title: 'Data Analytics Intern', department: 'Analytics', description: 'Create reports, dashboards, and insight summaries.', skills: ['Excel', 'Power BI', 'Python'], duration: '6 Weeks', stipend: 'Certificate + LOR', deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }
]);

const seminar = await Seminar.create({ title: 'Crack Your First Internship', speaker: 'Industry Mentor Panel', topic: 'Career Guidance', description: 'A live seminar for students preparing for internships.', scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), meetingLink: 'https://meet.example.com/t2hubs' });
const tasks = await Task.insertMany([
  { internship: internships[0]._id, title: 'Week 1: Portfolio Landing Page', description: 'Create a responsive landing page.', week: 1 },
  { internship: internships[0]._id, title: 'Week 2: API Integration', description: 'Connect React UI to REST APIs.', week: 2 },
  { internship: internships[0]._id, title: 'Week 3: Dashboard Module', description: 'Build dashboard widgets and tables.', week: 3 }
]);

await Registration.create({ student: student._id, seminar: seminar._id, name: student.name, email: student.email, type: 'seminar', status: 'Pending' });
await Registration.create({ student: student._id, internship: internships[0]._id, name: student.name, email: student.email, type: 'internship', status: 'Approved' });
await InternshipProgress.create({ student: student._id, internship: internships[0]._id, status: 'In Progress', percentage: 33, startedAt: new Date(), tasks: [{ task: tasks[0]._id, completed: true, completedAt: new Date() }, { task: tasks[1]._id, completed: false }] });
await Certificate.create({ student: student._id, studentName: student.name, title: 'Frontend Developer Internship', grade: 'A', certificateId: 'T2H-2026-DEMO', verificationUrl: `${process.env.CLIENT_URL}/verify-certificate/demo` });
await Notification.create({ user: student._id, title: 'Welcome to T2Hubs', message: 'Your dashboard is ready.', type: 'success' });
await Attendance.create({ student: student._id, internship: internships[0]._id, status: 'Present' });

console.log('Seed complete');
console.log('Admin: admin@t2hubs.com / Admin@123');
console.log('Student: student@t2hubs.com / Student@123');
process.exit(0);
