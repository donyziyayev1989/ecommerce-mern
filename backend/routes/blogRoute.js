const express = require('express');
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getAllBlog,
  likeBlog,
  disLikeBlog,
} = require('../controller/blogCtrl');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, createBlog);
router.put('/like/:blogId', verifyToken, likeBlog);
router.put('/dislike/:blogId', verifyToken, disLikeBlog);
router.put('/:blogId', verifyToken, isAdmin, updateBlog);
router.get('/', getAllBlog);
router.get('/:blogId', getBlog);
router.delete('/:blogId', verifyToken, isAdmin, deleteBlog);

module.exports = router;
