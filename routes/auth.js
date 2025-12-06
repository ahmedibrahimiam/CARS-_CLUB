const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) { res.status(400); throw new Error('Please provide email and password'); }
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error('User already exists'); }
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(201).json({ success: true, token, user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
}));

// login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error('Invalid credentials'); }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ success: true, token, user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
}));

module.exports = router;
