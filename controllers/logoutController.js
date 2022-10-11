const User = require('../models/User');
const { resolveAny } = require('dns');

const handleLogout = async (req,res) => {
    const user = JSON.stringify(req.body.user).replace(/[^\w\s]/gi, '');
    console.log(user)
    //on client, also delete access token

    const cookies = req.cookies;
    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    var foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) { 
        foundUser = await User.findOne({ "username": user })
    }

    if(!foundUser && !user) { res.send(204) }
    
    //delete refresh token from db
    if(foundUser?.refreshToken) {
        foundUser.refreshToken = '';
        const result = await foundUser.save();
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}); // secure: true - only serve on https
    res.sendStatus(204);
    console.log("cookies cleared!")
}

module.exports = { handleLogout };