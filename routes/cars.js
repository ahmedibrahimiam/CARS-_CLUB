const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Car = require('../models/Car');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', asyncHandler(async (req, res) => {
    const cars = await Car.find({});
    res.json({ success: true, count: cars.length, data: cars });
}));

router.get('/sale', asyncHandler(async (req, res) => {
    const saleCars = await Car.find({ category: 'sale' });
    res.json({ success: true, data: saleCars });
}));

router.get('/rent', asyncHandler(async (req, res) => {
    const rentCars = await Car.find({ category: 'rent' });
    res.json({ success: true, data: rentCars });
}));

router.post('/add', protect, admin, asyncHandler(async (req, res) => {
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
}));

module.exports = router;