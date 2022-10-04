const Stream = require('../models/Stream');

const getQuestion = async (req,res) => {
    cat = req.body.category;
    stream = await Stream.findOne({ 'category': cat });
}

module.exports = { getQuestion };