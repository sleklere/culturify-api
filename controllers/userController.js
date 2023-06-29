const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { getOne, getAll } = require('./handlers');

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  user.password = undefined;

  console.log(user);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getAllUsers = getAll(User);

exports.getUser = getOne(User);
