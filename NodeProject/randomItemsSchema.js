const mongoose = require('mongoose')

const RandomItemsObject = mongoose.Schema;

const RandomItemsModel = new RandomItemsObject({
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: Number,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    randomItemsData: {
        type: String,
        required: true
    },
    dateInserted:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("randomItemsObject", RandomItemsModel);