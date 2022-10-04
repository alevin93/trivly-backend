const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question')

const streamSchema = new Schema({
    stream: {
        type: String,
        required: true,
    },
    catagory: {
        type: String,
        required: true,
    },
    question: {
        type: Question,
    },
});

module.exports = mongoose.model('Stream', streamSchema)