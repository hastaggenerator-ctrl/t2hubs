import Attendance from '../models/Attendance.js';
import Certificate from '../models/Certificate.js';
import ContactMessage from '../models/ContactMessage.js';
import Internship from '../models/Internship.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Registration from '../models/Registration.js';
import Seminar from '../models/Seminar.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const analytics = asyncHandler(async (req, res) => {
  const [students, internships, seminars, certificates, registrations, messages, attendance] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    Internship.countDocuments(),
    Seminar.countDocuments(),
    Certificate.countDocuments(),
    Registration.countDocuments(),
    ContactMessage.countDocuments({ status: 'New' }),
    Attendance.find().limit(1000)
  ]);
  const present = attendance.filter((item) => item.status === 'Present').length;
  res.json({
    totals: { students, internships, seminars, certificates, registrations, messages },
    attendancePercentage: attendance.length ? Math.round((present / attendance.length) * 100) : 0,
    monthlyRegistrations: await Registration.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ])
  });
});

export const reviewLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, { status: req.body.status, reviewedBy: req.user._id }, { new: true });
  res.json(leave);
});

export const attendanceReport = asyncHandler(async (req, res) => {
  const records = await Attendance.find().populate('student internship').sort('-date');
  res.json(records);
});
