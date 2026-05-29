import mongoose from 'mongoose';

const taskProgressSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    completed: { type: Boolean, default: false },
    completedAt: Date,
    submissionUrl: String,
    feedback: String
  },
  { _id: false }
);

const internshipProgressSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
    tasks: [taskProgressSchema],
    percentage: { type: Number, default: 0 },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    startedAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('InternshipProgress', internshipProgressSchema);

