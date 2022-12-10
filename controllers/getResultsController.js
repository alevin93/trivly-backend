const User = require('../models/User');

const sendResults = async (req,res) => {

    let username = req.body.user;
    console.log("sendResults run!");
    console.log(username);
    const foundUser = await User.findOne({ username: username }).exec();

    
    if (username && username !== "Guest") {
        let results = foundUser.records;

        console.log(JSON.stringify(results))

        return res.json(JSON.stringify(
            [
                results
            ]
        ));

    } else {  }
    

}


module.exports = { sendResults };