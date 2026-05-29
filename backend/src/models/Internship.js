import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: String,
    description: String,
    skills: [String],
    duration: String,
    stipend: String,
    location: { type: String, default: 'Remote' },
    openings: { type: Number, default: 10 },
    deadline: Date,
    status: { type: String, enum: ['Open', 'Closed', 'Draft'], default: 'Open' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export default mongoose.model('Internship', internshipSchema);

