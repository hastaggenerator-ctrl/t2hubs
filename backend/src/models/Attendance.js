import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
    date: { type: Date, default: Date.now },
    dayKey: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },
    note: String
  },
  { timestamps: true }
);

attendanceSchema.pre('validate', function fillDayKey(next) {
  if (!this.dayKey) {
    this.dayKey = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(this.date || new Date());
  }
  next();
});

attendanceSchema.index({ student: 1, dayKey: 1 }, { unique: true, partialFilterExpression: { dayKey: { $exists: true } } });
export default mongoose.model('Attendance', attendanceSchema);
