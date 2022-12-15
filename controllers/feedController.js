const User = require('../models/User');
const { resolveAny } = require('dns');
const { populate } = require('../models/User');

const generateFeed = async (req,res) => {
    //check if cookies
    const cookies = req.cookies;
    const user = JSON.stringify(req.body.user).replace(/[^\w\s]/gi, '');

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ "username": user }).exec();

    if (foundUser) {
        let subs = foundUser.subscriptions;
        let array = foundUser.arrayFeed;
        let counter = 0;

        for(let i = 0; i <= array.length; i++) {
            if(array[i]) {
                subs.splice(i-counter,1);
                counter++;
            }
        }
        console.log(subs);
        if(subs.length === 0) {
            res.send("8675309");
        } 
        else {
            res.json(JSON.stringify(
                [
                    subs
                ]
            ))
        }
    }
    else if (!foundUser) { 
        res.json(JSON.stringify(
         
            [
                "History",
                "Music",
                "Geography",
                "Film and TV",
                "Science",
                "General Knowledge"
            ]
                
            ))
    }
    
}

module.exports = { generateFeed };