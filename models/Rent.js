const mongoose = require('mongoose');
const RentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  location: { type: String },
  paymentMethod: { type: String },
  status: { type: String, default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Rent', RentSchema);
