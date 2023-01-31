const asyncWrapper = require('../utils/asyncWrapper');
const { BCategory } = require('../models/categoryModel');

const createCategory = asyncWrapper(async (req, res) => {
  const saved = await BCategory.create(req.body);
  res.json(saved);
});
const getCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await BCategory.findById(catId);
  res.json(category);
});
const updateCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await BCategory.findByIdAndUpdate(catId, req.body, {
    new: true,
  });
  res.json(category);
});
const deleteCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await BCategory.findByIdAndDelete(catId);
  res.json(category);
});
const getAllCategory = asyncWrapper(async (req, res) => {
  const category = await BCategory.find();
  res.json(category);
});

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
