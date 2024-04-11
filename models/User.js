const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  description: {
    type: String,
    maxlength: [
      100,
      "Your profile description can't be longer than 100 characters",
    ],
  },
  photo: {
    type: String,
    default: 'user_default.png',
  },
  password: {
    type: String,
    required: [true, 'Please provid a password'],
    minlength: 10,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please re-enter your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords must match!',
    },
  },
});

// encrypt password before being saved to db (after validator is ran)
userSchema.pre('save', async function (next) {
  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// pre-find => query active users only (find({active: {$ne: false}}))
// not equal to false instead of equal true because active users do not have the active property explicitly set to true

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
