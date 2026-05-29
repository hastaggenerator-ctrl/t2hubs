import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
    seminar: { type: mongoose.Schema.Types.ObjectId, ref: 'Seminar' },
    name: String,
    email: String,
    phone: String,
    college: String,
    currentYear: String,
    preferredTrack: String,
    availability: String,
    experience: String,
    portfolio: String,
    goal: String,
    source: String,
    consent: Boolean,
    type: { type: String, enum: ['internship', 'seminar'], required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Registration', registrationSchema);
