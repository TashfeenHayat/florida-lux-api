const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const catchAsync = require('../utils/catchAsync');
const { User, Role, Token } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const { firstName, lastName, photo, username, email, password, roleId } = req.body;
  
  const users = await User.find({ $or:[ { username }, { email } ]}); 

  if (users.length > 0) {
    return res.status(400).send('Username or email is taken')
  }

  if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).send('Role not found')
      }
  }
  
  await User.create({ 
    firstName, 
    lastName, 
    photo,
    username, 
    email, 
    password, 
    roleId : roleId || global.userRole, 
    userStatus: 'active' 
  });

  return res.status(200).send('User created successfully');
});

const getUsers = catchAsync(async (req, res) => {
  console.log(req.body);
});

const loginUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  let where = {};
  if (username) {
    where.username = username;
  } else if (email) {
    where.email = email;
  } else {
    return res.status(400).send('Username or email is required')
  }
  if (!password) {
    return res.status(400).send('Password is required')
  }

  try {
    const user = await User.findOne(where);

    if (!user) {
      return res.status(404).json('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json('Incorrect password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1 year'
    });

    await Token.updateMany(
      { userId: user._id}, { $set: { isValid: false }}, { multi: true}
    )
    Token.create({ userId: user._id, token, isValid: true, expiresIn: 1 });

    delete user.id;    delete user.roleId;    delete user.password;

    return res.json({ user: user ,token, expiresIn: '1 year' });
  } catch (error) {
    throw(error);
  }
});

const getUser = catchAsync(async (req, res) => {
  return res.status(200).send(req.user)
});

const updateProfile = catchAsync(async (req, res) => {

});

const updatePassword = catchAsync(async (req, res) => {

});

const forgotPassword = catchAsync(async (req, res) => {
  
});

const resetPassword = catchAsync(async (req, res) => {

});

const getAllUsers = catchAsync(async (req, res) => {

});
const logoutUser = catchAsync(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Token.deleteOne({ userId: decoded.userId, token });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  loginUser,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  getAllUsers, logoutUser
};
