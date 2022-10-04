const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscriptions: {
        type: Number,
    },
    streams: {
        type: Number,
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema)