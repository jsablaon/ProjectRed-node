const mongoose = require('mongoose');

const Store = mongoose.Schema;

const StoreModel = new Store({
    StoreId: {
        type: Number,
        required: true
    },
    StoreName: {
        type: String,
        required: true
    },
    Items: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model("stores", StoreModel);