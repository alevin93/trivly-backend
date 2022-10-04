const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    category: String,
    question: String,
    correct: String,
    incorrect: Array,
    lastUsed: {
        type: Number,
        default: null,
    }
});

module.exports = mongoose.model('Question', questionSchema)