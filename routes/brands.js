const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');
const { protect, admin } = require('../middleware/authMiddleware');

// GET brands
router.get('/', asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({ success: true, count: brands.length, data: brands });
}));

// add brand (admin)
router.post('/add', protect, admin, asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({ success: true, data: brand });
}));

module.exports = router;
