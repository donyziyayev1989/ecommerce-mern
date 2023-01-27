const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const asyncHandler = require('express-async-handler');
const { generateToken, generateRefreshToken } = require('../config/jwtToken');
const { hashedElement, compareToHash } = require('../utils/hashElement');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../utils/asyncWrapper');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create new user
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error('User already exists');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  const passwordMatch = await findUser.isPasswordMatch(password);

  if (findUser && passwordMatch) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updatedUser = await User.findByIdAndUpdate(
      findUser?._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      mobile: findUser?.mobile,
      email: findUser?.email,
      token: generateToken(findUser?._id),
      refreshToken,
    });
  } else {
    throw new Error('Invalid credentials');
  }
});

const refreshTokenHandler = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    throw new Error('There is no refreshToken in Cookie');
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  console.log(user);
  if (!user) {
    throw new Error('there is no refreshtoken in DB');
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err);
    }
    const accessToken = generateToken(decoded._id);
    res.json({ accessToken });
  });
});
const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie.refreshToken) throw new Error('no refresh token in Cookies');
  const refreshToken = cookie.refreshToken;
  const updatedUser = await User.findOneAndUpdate(
    refreshToken,
    {
      rerefreshToken: '',
    },
    { new: true }
  );
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  return res.statusCode(204);
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json('User is blocked');
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json('User is unblocked');
  } catch (error) {
    throw new Error(error);
  }
});
const requestPasswordReset = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("user with given email doesn't exist");

  // Try to find token with userdId
  let findToken = await Token.findOne({ userId: user._id });
  if (findToken) await findToken.deleteOne();
  let resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = await hashedElement(resetToken);

  const newToken = await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
  }).save();

  // generate link for reset password
  const link = `${process.env.BASE_URL}/user/password-reset/${user._id}/${resetToken}`;
  const html = `<h2>Hi ${user.firstname},</h2>
                <h3>Please click below the link for resetting your password</h3> 
                <p>Link is available withing 10 minuts</p>
                <p> <b>Click the link</b> <br />
                <a href="${link}">Proccess link</a></p>`;
  sendEmail(user.email, 'Password request', html);
  res.json(`<a href="${link}"></a>`);
});

// https://blog.logrocket.com/implementing-secure-password-reset-node-js/
// https://dev.to/cyberwolves/how-to-implement-password-reset-via-email-in-node-js-132m

const resetPassword = asyncWrapper(async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;
  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).send('Not found User: invalid link or expired');
  }

  const findToken = await Token.findOne({
    userId,
  });
  if (!findToken)
    return res.status(400).send('Not found token: Invalid link or expired');

  const isValid = await compareToHash(token, findToken.token);
  if (!isValid)
    return res.status(400).send('Not found token: Invalid link or expired');

  if (password) {
    findUser.password = password;
    await findUser.save();
    await findToken.delete();
  } else {
    res.json('Please enter the password');
  }

  res.json({
    success: true,
    msg: 'Password is reset successfully',
  });
});

module.exports = {
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
};
