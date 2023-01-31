const asyncWrapper = require('../utils/asyncWrapper');
const Brand = require('../models/brandModel');

const createBrand = asyncWrapper(async (req, res) => {
  const saved = await Brand.create(req.body);
  res.json(saved);
});
const getBrand = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const brand = await Brand.findById(catId);
  res.json(brand);
});
const updateBrand = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const brand = await Brand.findByIdAndUpdate(catId, req.body, {
    new: true,
  });
  res.json(brand);
});
const deleteBrand = asyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const brand = await Brand.findByIdAndDelete(catId);
  res.json(brand);
});
const getAllBrand = asyncWrapper(async (req, res) => {
  const brand = await Brand.find();
  res.json(brand);
});

module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
};
