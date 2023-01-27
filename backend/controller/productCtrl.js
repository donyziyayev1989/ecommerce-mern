const Product = require('../models/productModel');
const asyncWrapper = require('../utils/asyncWrapper');

// Create product
const createProduct = asyncWrapper(async (req, res) => {
  const newProduct = new Product(req.body);
  const product = await newProduct.save();
  res.status(201).json(product);
});

// Get product
const getProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  !product && res.status(404).json('There is no product with this ID');

  res.status(201).json(product);
});

// Get product
const getAllProducts = asyncWrapper(async (req, res) => {
  let filter;
  let products;
  const {
    category,
    color,
    brand,
    search,
    page = 1,
    limit,
    fields,
    sort,
  } = req.query;
  const sortBy = (sort && sort.split(',').join(' ')) || 'createdAt: -1';
  const selectedFields = fields && fields.split(',').join(' ');
  const currentPage = page || 1;
  let limits = limit || 10;
  const skip = (page - 1) * limit;

  // Filters
  let queryObj = { ...req.query };
  const excludeFields = ['sort', 'page', 'fields', 'limit'];
  // Delete all fields except filters
  excludeFields.forEach((el) => delete queryObj[el]);
  // replace query
  queryObj = JSON.stringify(queryObj).replace(
    /\b(gte|gt|lt|lte)/g,
    (match) => `$${match}`
  );
  filter = JSON.parse(queryObj);
  if (category) filter = { ...filter, category: { $in: category } };
  if (color) filter = { ...filter, color: { $in: color } };
  if (brand) filter = { ...filter, brand: { $in: brand } };

  // Search products
  if (search) {
    filter = { title: { $regex: search, $options: 'i' } };
  }

  // Get counts of filtered products
  const count = await Product.countDocuments(filter);
  if (skip >= count) {
    throw new Error('This page does not exists');
  }

  products = await Product.find(filter, selectedFields, {
    skip: skip,
    limit: limits,
  });
  !products && res.status(404).json('There is no product ');

  res.status(200).json({
    data: products,
    count,
    skip: parseInt(skip) || 0,
    limit: parseInt(limits) || 10,
    currentPage: parseInt(currentPage),
    totalPages: Math.ceil(count / limits),
  });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) res.status(200).json('Product already deleted');

  res.status(200).json(deletedProduct);
});

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
