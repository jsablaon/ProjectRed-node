const mongoose = require('mongoose');

const Cart = mongoose.Schema;

const cartItemSchema = new Cart({
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    itemQty: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    itemVideo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("cartItems", cartItemSchema);