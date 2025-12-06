const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  modelYear: { type: Number },
  details: { type: String },
  pricePerDay: { type: Number, required: true },
  imageUrl: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Car', CarSchema);
