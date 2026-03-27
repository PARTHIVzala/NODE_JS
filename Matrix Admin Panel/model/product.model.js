const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    extracategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extracategory',
        required: true
    },
    productImage: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema);