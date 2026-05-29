import crypto from 'crypto';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../utils/token.js';
import { sendMail } from '../services/emailService.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, college } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const user = await User.create({ name, email, password, phone, college, role: 'student' });
  res.status(201).json({ token: signToken(user), user: sanitize(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  res.json({ token: signToken(user), user: sanitize(user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = crypto.randomBytes(24).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30;
    await user.save();
    const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendMail({ to: user.email, subject: 'Reset your T2Hubs password', html: `<p>Reset password: <a href="${url}">${url}</a></p>` });
  }
  res.json({ message: 'If that email exists, a reset link has been sent.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    res.status(400);
    throw new Error('Reset token is invalid or expired');
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ token: signToken(user), user: sanitize(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

function sanitize(user) {
  return { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, college: user.college, avatar: user.avatar };
}

