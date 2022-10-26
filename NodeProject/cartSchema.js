const mongoose = require('mongoose');

const Cart = mongoose.Schema;

const cartSchema = new Cart({
    CartId: {
        type: Number,
        required: true
    },
    UserId: {
        type: Number,
        required: true
    },
    Items: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("carts", cartSchema);