import { asyncHandler } from '../utils/asyncHandler.js';

export const list = (Model, populate = '') => asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 100);
  const search = req.query.search;
  const query = search ? { $or: ['title', 'name', 'email', 'category'].map((key) => ({ [key]: new RegExp(search, 'i') })) } : {};
  const [items, total] = await Promise.all([
    Model.find(query).populate(populate).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Model.countDocuments(query)
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

export const getOne = (Model, populate = '') => asyncHandler(async (req, res) => {
  const item = await Model.findById(req.params.id).populate(populate);
  if (!item) {
    res.status(404);
    throw new Error('Record not found');
  }
  res.json(item);
});

export const createOne = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.create(req.body);
  res.status(201).json(item);
});

export const updateOne = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    res.status(404);
    throw new Error('Record not found');
  }
  res.json(item);
});

export const deleteOne = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Record not found');
  }
  res.json({ message: 'Deleted successfully' });
});

