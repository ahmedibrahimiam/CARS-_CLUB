const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Car = require('../models/Car');
const { protect, admin } = require('../middleware/authMiddleware');

// GET cars
router.get('/', asyncHandler(async (req, res) => {
  const cars = await Car.find();
  res.json({ success: true, count: cars.length, data: cars });
}));

// add car (admin)
router.post('/add', protect, admin, asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);
  res.status(201).json({ success: true, data: car });
}));

module.exports = router;
