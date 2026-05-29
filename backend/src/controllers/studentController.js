import Attendance from '../models/Attendance.js';
import Certificate from '../models/Certificate.js';
import InternshipProgress from '../models/InternshipProgress.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Notification from '../models/Notification.js';
import Registration from '../models/Registration.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const dayFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const todayKey = (date = new Date()) => dayFormatter.format(date);

export const dashboard = asyncHandler(async (req, res) => {
  const [registrations, certificates, progress, notifications, attendance] = await Promise.all([
    Registration.find({ $or: [{ student: req.user._id }, { email: req.user.email }] }).populate('internship seminar'),
    Certificate.find({ student: req.user._id }).populate('internship'),
    InternshipProgress.find({ student: req.user._id }).populate('internship tasks.task'),
    Notification.find({ user: req.user._id }).sort('-createdAt').limit(20),
    Attendance.find({ student: req.user._id }).sort('-date').limit(30)
  ]);
  res.json({ registrations, certificates, progress, notifications, attendance });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select('-password');
  res.json(user);
});

export const markAttendance = asyncHandler(async (req, res) => {
  if (req.user.role !== 'student') {
    res.status(403);
    throw new Error('Only students can mark attendance');
  }

  const dayKey = todayKey();
  const existing = await Attendance.findOne({ student: req.user._id, dayKey });
  if (existing) {
    res.status(409);
    throw new Error('Attendance is already marked for today');
  }

  const item = await Attendance.create({
    ...req.body,
    status: req.body.status || 'Present',
    note: req.body.note || 'Marked from student dashboard',
    student: req.user._id,
    date: new Date(),
    dayKey
  });
  res.status(201).json(item);
});

export const attendanceForStudent = asyncHandler(async (req, res) => {
  const student = req.params.id === 'me' ? req.user._id : req.params.id;
  const records = await Attendance.find({ student }).sort('-date').populate('internship');
  const present = records.filter((r) => r.status === 'Present').length;
  const todayRecord = records.find((r) => r.dayKey === todayKey());
  res.json({
    records,
    todayRecord,
    canMarkToday: !todayRecord,
    percentage: records.length ? Math.round((present / records.length) * 100) : 0
  });
});

export const requestLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.create({ ...req.body, student: req.user._id });
  res.status(201).json(leave);
});
