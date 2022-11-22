const mongoose = require('mongoose');
const cartItemSchema = require('./cartItemSchema');

const Cart = mongoose.Schema;

const cartSchema = new Cart({
    cartId: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("carts", cartSchema);