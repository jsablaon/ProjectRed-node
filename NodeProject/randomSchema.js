const mongoose = require('mongoose')

const RandomObject = mongoose.Schema;

const RandomModel = new RandomObject({
    randomData: {
        type: String,
        required: true
    },
    dateInserted:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("randomObject", RandomModel);