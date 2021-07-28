const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    select: false //the password won't be shown in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (elt) {
        return elt === this.password;
      },
      message: 'Passwords do not match!'
    }
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  /*cost = 12, that is cpu intensive cost: not to make the password too easy for the computers to guess
  but also not too tough that the app takes too much time encrypting it */
  this.password = await bcrypt.hash(this.password, 12);

  //delete the confirmPassword field as it's not requires in the database
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('USer', userSchema);

module.exports = User;
