const asyncWrapper = require('../utils/asyncWrapper');
const Blog = require('../models/blogModel');

const createBlog = asyncWrapper(async (req, res) => {
  const newBlog = new Blog(req.body);
  const blog = await newBlog.save();

  res.status(201).json(blog);
});

const updateBlog = asyncWrapper(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });

  res.status(201).json(blog);
});
const getBlog = asyncWrapper(async (req, res) => {
  const { blogId } = req.params;

  // const blog = await Blog.findByIdAndUpdate(
  //   blogId,
  //   {
  //     $inc: {
  //       numViews: 1,
  //     },
  //   },
  //   { new: true }
  // );
  const blog = await Blog.findById(blogId)
    .populate('likes')
    .populate('disLikes');

  blog.$inc('numViews', 1);
  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

const deleteBlog = asyncWrapper(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findByIdAndDelete(blogId);

  res.status(200).json(blog);
});

const getAllBlog = asyncWrapper(async (req, res) => {
  const { sort, fields, search, page, limit, author } = req.query;
  const sortBy = (sort && sort.split(',').join(' ')) || 'createdAt: -1';
  const selectedFields = fields && fields.split(',').join(' ');
  let pageN = page || 1;
  const limits = limit || 10;
  const skip = (pageN - 1) * limit;

  // Filter
  let queryObj = { ...req.query };
  let filter;
  const excludeFields = ['sort', 'page', 'fields', 'limit'];
  excludeFields.forEach((el) => delete queryObj[el]);
  queryObj = JSON.stringify(queryObj).replace(
    /\b(gt|lt|gte|lte)/g,
    (match) => `$${match}`
  );
  filter = JSON.parse(queryObj);

  if (search) {
    filter = { title: { $regex: search, $options: 'i' } };
  }
  // Get counts of filtered products
  const count = await Blog.countDocuments(filter);
  if (skip >= count) {
    throw new Error('This page does not exists');
  }

  const blog = await Blog.find(filter, selectedFields, {
    skip: skip,
    limit: limits,
  });
  res.status(200).json({
    data: blog,
    count,
    currentPage: parseInt(pageN),
    limit: parseInt(limits),
    totalPage: Math.ceil(count / limits),
  });
});

const likeBlog = asyncWrapper(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user?._id;
  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error('Blog does not exists');
  const isLiked = blog.isLiked;

  const isAlreadyDisliked = blog.disLikes?.find(
    (id) => id.toString() === userId.toString()
  );
  // Like if you disliked before
  if (isAlreadyDisliked) {
    blog.disLikes.pull(userId);
    blog.$set('isDisLiked', false);
  }
  if (isLiked) {
    blog.$set('isLiked', false);
    blog.likes.pull(userId);
  } else {
    blog.$set('isLiked', true);
    blog.likes.push(userId);
  }

  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});

const disLikeBlog = asyncWrapper(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user?._id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error('Blog does not exists');
  }
  const disLiked = blog.isDisLiked;
  const isAlreadyLiked = blog.likes.map(
    (id) => id.toString() === userId.toString()
  );
  // if user already disliked blog post, then remove userId from likes array
  if (isAlreadyLiked) {
    blog.likes.pull(userId);
    blog.$set('isLiked', false);
  }
  if (disLiked) {
    blog.disLikes.pull(userId);
    blog.$set('isDisLiked', false);
  } else {
    blog.disLikes.push(userId);
    blog.$set('isDisLiked', true);
  }
  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getAllBlog,
  likeBlog,
  disLikeBlog,
};
