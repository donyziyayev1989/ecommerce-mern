const asyncWrapper = require('../utils/asyncWrapper');
const { PCategory } = require('../models/categoryModel');

const createCategory = asyncWrapper(async (req, res) => {
  const saved = await PCategory.create(req.body);
  res.json(saved);
});
const getCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await PCategory.findById(catId);
  res.json(category);
});
const updateCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await PCategory.findByIdAndUpdate(
    catId,
    { title: req.body.title },
    {
      new: true,
    }
  );
  res.json(category);
});
const deleteCategory = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const category = await PCategory.findByIdAndDelete(catId);
  res.json(category);
});
const getAllCategory = asyncWrapper(async (req, res) => {
  const allCategory = await PCategory.find();
  res.json(allCategory);
});

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
