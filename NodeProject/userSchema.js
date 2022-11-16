const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    UserId: {
        type: String,
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

module.exports = mongoose.model("user", UserSchema);
