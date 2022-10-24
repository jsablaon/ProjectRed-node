const mongoose = require('mongoose');

const User = mongoose.Schema;

const UserModel = new User({
    UserId: {
        type: Number,
        required: true
    },
    FName: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },    
    Email: {
        type: String,
        required: true
    },    
    Password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", UserModel);