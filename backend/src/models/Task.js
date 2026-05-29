import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
    title: { type: String, required: true },
    description: String,
    week: { type: Number, default: 1 },
    dueDate: Date,
    resources: [String],
    points: { type: Number, default: 10 }
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);

