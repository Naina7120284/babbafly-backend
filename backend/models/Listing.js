const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    location: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);