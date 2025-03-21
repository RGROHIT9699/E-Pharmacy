const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            orderDate:{
                type: Date,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
});

let Order = mongoose.model('Order', orderSchema);
module.exports = Order;
