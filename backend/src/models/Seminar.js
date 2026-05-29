import mongoose from 'mongoose';

const seminarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    speaker: String,
    topic: String,
    description: String,
    scheduledAt: Date,
    meetingLink: String,
    capacity: { type: Number, default: 200 },
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
    status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], default: 'Upcoming' }
  },
  { timestamps: true }
);

export default mongoose.model('Seminar', seminarSchema);

