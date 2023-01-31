const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  refreshTokenHandler,
  logoutUser,
  requestPasswordReset,
  resetPassword,
  addToWishlist,
} = require('../controller/userCtrl');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh', refreshTokenHandler);
router.post('/request-password-reset/', requestPasswordReset);
router.post('/password-reset/:userId/', resetPassword);
router.get('/all-users', verifyToken, isAdmin, getAllUser);
router.get('/:id', verifyToken, getUser);

router.delete('/:id', verifyToken, deleteUser);
router.put('/wishlist', verifyToken, addToWishlist);
router.put('/:id', verifyToken, updateUser);
router.put('/block-user/:id', verifyToken, isAdmin, blockUser);
router.put('/unblock-user/:id', verifyToken, isAdmin, unblockUser);
module.exports = router;
