const Stream = require('../models/Stream');
const User = require('../models/User')

const getQuestion = async (req,res) => {
    cat = req.body.category;
    if (!cat) { res.send(404) }
    stream = await Stream.findOne({ 'category': cat });

    const user = JSON.stringify(req.body.user).replace(/[^\w\s]/gi, '');

    var foundUser = await User.findOne({ "username": user }).exec();

    if(foundUser) {
        let subs = foundUser.subscriptions;
        let hasDone = foundUser.arrayFeed;
        for(let i = 0; i <= foundUser.subscriptions.length; i++) {
            if(foundUser.subscriptions[i] == cat) {
                hasDone[i] = true;
            }
        }

        foundUser.arrayFeed = hasDone;

        const result = await foundUser.save();

        //console.log(result);

        console.log(cat + " has been removed from feed")
    }

    try {
    res.send(stream.question);
    } catch(err) { console.log("Error retrieving ~" + cat + "~ stream") }

    
}

module.exports = { getQuestion };