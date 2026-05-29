import InternshipProgress from '../models/InternshipProgress.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const updateProgress = asyncHandler(async (req, res) => {
  const { student, internship, task, completed, submissionUrl, feedback } = req.body;
  let progress = await InternshipProgress.findOne({ student, internship });
  if (!progress) progress = await InternshipProgress.create({ student, internship, startedAt: new Date(), status: 'In Progress', tasks: [] });
  const taskItem = progress.tasks.find((item) => String(item.task) === String(task));
  if (taskItem) Object.assign(taskItem, { completed, submissionUrl, feedback, completedAt: completed ? new Date() : undefined });
  else progress.tasks.push({ task, completed, submissionUrl, feedback, completedAt: completed ? new Date() : undefined });
  const completedCount = progress.tasks.filter((item) => item.completed).length;
  progress.percentage = progress.tasks.length ? Math.round((completedCount / progress.tasks.length) * 100) : 0;
  progress.status = progress.percentage === 100 ? 'Completed' : 'In Progress';
  progress.completedAt = progress.percentage === 100 ? new Date() : undefined;
  await progress.save();
  res.json(progress);
});

export const getProgress = asyncHandler(async (req, res) => {
  const progress = await InternshipProgress.find({ student: req.params.studentId }).populate('internship tasks.task');
  res.json(progress);
});

