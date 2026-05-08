const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number },
    category: { 
        type: String, 
        required: true, 
        enum: ['sale', 'rent'] 
    },
    // حقل السعر للبيع (اختياري لو النوع إيجار)
    price: { 
        type: Number, 
        required: function() { return this.category === 'sale'; } 
    },
    // حقل السعر لليوم (اختياري لو النوع بيع)
    pricePerDay: { 
        type: Number, 
        required: function() { return this.category === 'rent'; } 
    },
    imageUrl: { type: String, default: 'no-photo.jpg' }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);