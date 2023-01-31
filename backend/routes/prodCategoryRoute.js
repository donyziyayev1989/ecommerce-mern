const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require('../controller/prodCategoryCtrl');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, createCategory);
router.get('/:catId', getCategory);
router.put('/:catId', verifyToken, isAdmin, updateCategory);
router.delete('/:catId', verifyToken, isAdmin, deleteCategory);
router.get('/', getAllCategory);

module.exports = router;
