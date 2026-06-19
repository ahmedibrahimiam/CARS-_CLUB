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
    price: { 
        type: Number, 
        required: function() { return this.category === 'sale'; } 
    },
    pricePerDay: { 
        type: Number, 
        required: function() { return this.category === 'rent'; } 
    },
    images: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);