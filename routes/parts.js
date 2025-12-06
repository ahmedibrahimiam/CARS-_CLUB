const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Part = require('../models/Part');
const { protect, admin } = require('../middleware/authMiddleware');

// GET parts
router.get('/', asyncHandler(async (req, res) => {
  const parts = await Part.find();
  res.json({ success: true, count: parts.length, data: parts });
}));

// add part (admin)
router.post('/add', protect, admin, asyncHandler(async (req, res) => {
  const part = await Part.create(req.body);
  res.status(201).json({ success: true, data: part });
}));

module.exports = router;
