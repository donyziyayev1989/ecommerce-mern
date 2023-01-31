const express = require('express');
const router = express.Router();
const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
} = require('../controller/brandCtrl');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, createBrand);
router.get('/:catId', getBrand);
router.put('/:catId', verifyToken, isAdmin, updateBrand);
router.delete('/:catId', verifyToken, isAdmin, deleteBrand);
router.get('/', getAllBrand);

module.exports = router;
