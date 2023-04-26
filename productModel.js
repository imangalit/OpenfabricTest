const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a product name']
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
    },
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product;