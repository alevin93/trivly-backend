const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type:String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscriptions: {
        type: Array,
        default: [
            "History",
            "Music",
            "Film and TV",
            "Science",
            "General Knowledge",
        ]
    },
    arrayFeed: {
        type: Array,
        default: [
            false,
            false,
            false,
            false,
            false,
        ]
    },
    records: {
        type: Array
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema)