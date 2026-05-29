import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { type: String, enum: ['New', 'Read', 'Resolved'], default: 'New' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);

