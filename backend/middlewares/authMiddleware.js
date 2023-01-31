const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = asyncHandler(async (req, res, next) => {
  if (req.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error('Not authorized, token is expired, please login again');
    }
  } else {
    throw new Error('There is no token ');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req?.user?.role === 'admin') {
    next();
  } else {
    throw new Error('You are not allowed to do this');
  }
});

module.exports = { verifyToken, isAdmin };
