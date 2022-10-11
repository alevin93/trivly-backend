const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req,res) => {
    const { user, pwd } = req.body;
    if ( !user || !pwd ) return res.status(400).json({ 'message': 'Username and Password are required' });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //unauthorized
    //evaluate password
    console.log("Password given is: " + pwd);
    console.log("Stored Password is: " + foundUser.password);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '15d' }
        );
        //saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };