const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    console.log(req.body);
    if ( !user || !pwd ) return res.status(400).json({ 'message': 'Username and Password are required' });
    console.log(req.body);
    //check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //conflict status
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10); //10 salt rounds
        //store the new user
        const result = await User.create({ 
            "username": user,
            "password": hashedPwd,
            "records": {
                category: "placeholder",
            }
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser }