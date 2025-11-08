const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, course } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    enrolledCourses: course ? [{ courseName: course, enrolledAt: new Date() }] : []
  });

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: `Registration Successful! Welcome ${name}, you have enrolled in ${course}.`,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrolledCourses: user.enrolledCourses
      }
    }
  });
}));

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      message: 'Login successful!',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          enrolledCourses: user.enrolledCourses
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
}));

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', asyncHandler(async (req, res) => {
  // This would require authentication middleware
  // For now, we'll return a simple response
  res.json({
    success: true,
    message: 'User endpoint - authentication required'
  });
}));

module.exports = router;