const User = require('../models/User');
const { resolveAny } = require('dns');

const generateFeed = async (req,res) => {
    //check if cookies
    var userInfo = null;
    const cookies = req.cookies;

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) { 
        res.json(JSON.stringify(
         
            [
                "History",
                "Music",
                "Film & TV",
                "Science",
                "General Knowledge"
            ]
                
            ))
    } else if (foundUser) {
        res.json(JSON.stringify(
            [
                foundUser.subscriptions
            ]
        ))
    }
    
}

module.exports = { generateFeed };