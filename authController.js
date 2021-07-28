const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const signupToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_TIME
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    // const token = signupToken(newUser._id);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    //const email = req.body.email
    const { username, password } = req.body;

    // check if username and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide the username and password'
      });
    }

    //check if user exists && password is correct
    const user = await User.findOne({ username: username }).select('+password');
    // console.log(user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect username or password'
      });
    }

    //send the json web token if everything's fine
    const token = signupToken(user._id);
    res.status(201).json({
      status: 'success',
      token
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    //get the token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return res.status(401).json({
        status: 'error',
        message: 'token does not exist'
      });

    //verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user no longer exists'
      });
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      error: err
    });
  }
};

exports.getHelloMessage = (req, res, next) => {
  try {
    // console.log('In Hello route✌✌');
    res.status(201).json({
      status: 'success',
      message: 'Hello'
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err
    });
  }
};
