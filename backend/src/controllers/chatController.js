import ChatMessage from '../models/ChatMessage.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const sendChat = asyncHandler(async (req, res) => {
  const message = await ChatMessage.create({ ...req.body, sender: req.user._id });
  await Notification.create({ user: req.body.receiver, title: 'New support message', message: req.body.message, type: 'chat' });
  req.app.get('io')?.to(req.body.room || 'support').emit('chat:message', message);
  res.status(201).json(message);
});

export const getMessages = asyncHandler(async (req, res) => {
  const room = req.query.room || 'support';
  const messages = await ChatMessage.find({ room }).populate('sender receiver', 'name email role').sort('createdAt').limit(200);
  res.json(messages);
});

