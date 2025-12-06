const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Rent = require('../models/Rent');
const { protect } = require('../middleware/authMiddleware');

// Create rent order (user)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { carId, startDate, endDate, totalPrice, location, paymentMethod } = req.body;
  if (!carId || !startDate || !endDate || !totalPrice) { res.status(400); throw new Error('Missing required fields'); }
  const order = await Rent.create({ userId: req.user._id, carId, startDate, endDate, totalPrice, location, paymentMethod });
  res.status(201).json({ success: true, data: order });
}));

module.exports = router;
