import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: String,
    body: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('ContentBlock', contentBlockSchema);
