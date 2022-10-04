const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question').schema

const streamSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    question: {
        type: Question,
    },
});

module.exports = mongoose.model('Stream', streamSchema)