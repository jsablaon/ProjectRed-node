const mongoose = require('mongoose');
const cartItemSchema = require('./cartItemSchema');

const Cart = mongoose.Schema;

const cartSchema = new Cart({
    cartId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    cartTotal: {
        type: Number,
        require: true
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