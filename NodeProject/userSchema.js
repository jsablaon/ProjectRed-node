const mongoose = require('mongoose');

const User = mongoose.Schema;

const UserModel = new User({
    UserId: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },   
    Email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", UserModel);
