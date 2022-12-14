const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    category: String,
    guesses: Number,
    answered: Number,
});

module.exports = mongoose.model('Record', recordSchema)