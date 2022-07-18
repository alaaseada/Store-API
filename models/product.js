const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    featured: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, "Product name must be provided"]
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'caressa', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    price: {
        type: Number,
        required: [true, "Product price must be provided"]
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {strictQuery: true});

module.exports = mongoose.model('products', productSchema);