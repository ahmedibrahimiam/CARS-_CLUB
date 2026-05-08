const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String },
    modelYear: { type: Number },
    details: { type: String },
    price: { type: Number }, 
    pricePerDay: { type: Number },
    category: { 
        type: String, 
        required: true, 
        enum: ['sale', 'rent'] 
    },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);