const asyncWrapper = require('../utils/asyncWrapper');
const { PCategory } = require('../models/categoryModel');

const createCategory = asyncWrapper(async (req, res) => {
  const newCategory = new PCategory(req.body);
  const saved = await newCategory.save();
  res.json(saved);
});

module.exports = {
  createCategory,
};
