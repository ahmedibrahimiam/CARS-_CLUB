const mongoose = require('mongoose');
const PartSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  description: { type: String },
  price: { type: Number, required: [true, 'Please add a price'] },
  stockQuantity: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  category: { type: String, default: 'car-parts' },
  compatibleCars: [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('Part', PartSchema);
