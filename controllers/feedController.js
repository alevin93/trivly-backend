const User = require('../models/User');
const { resolveAny } = require('dns');

const generateFeed = async (req,res) => {
    //check if cookies
    const cookies = req.cookies;
    const user = JSON.stringify(req.body.user).replace(/[^\w\s]/gi, '');
    console.log(user)

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ "username": user }).exec();

    console.log(foundUser);

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