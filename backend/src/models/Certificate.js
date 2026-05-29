import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, unique: true, index: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
    studentName: String,
    title: { type: String, required: true },
    completionDate: { type: Date, default: Date.now },
    issueDate: { type: Date, default: Date.now },
    grade: String,
    verificationUrl: String,
    pdfUrl: String,
    isRevoked: { type: Boolean, default: false }
  },
  { timestamps: true }
);
export default mongoose.model('Certificate', certificateSchema);
