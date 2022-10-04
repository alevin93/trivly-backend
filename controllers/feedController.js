const User = require('../models/User');
const { resolveAny } = require('dns');

const generateFeed = async (req,res) => {
    //check if cookies
    const cookies = req.cookies;
    console.log(cookies);
    //if no cookies then send default questions/feed
    if ( !cookies?.jwt ) {
        res.send(JSON.stringify([
            "History",
            "Music",
            "Film & TV",
            "Science",
            "General Knowledge"
        ]))
    }; //send 

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) { 
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204); 
    }
    
    res.send(JSON.stringify(foundUser.subscriptions));
}

module.exports = { generateFeed };