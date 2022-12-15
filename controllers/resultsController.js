const User = require('../models/User');

const receiveResults = async (req,res) => {
    console.log(req.body);
    let { user, category, guesses, streakflag } = req.body;
    if ( !user || !category ) return res.status(204).json({ 'message': 'No user found in database' })
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(404);
    
    console.log("Guesses = " + guesses);

    for (let i = 0; i < foundUser.records.length; i++) {

        //console.log(foundUser?.records[i])
        
        if (foundUser?.records[i]?.category === category && foundUser?.records[i]?.category !== "placeholder" ) {

            let record = foundUser.records[i];
            record.attempted = record.attempted + 1;
            record.guesses = record.guesses + guesses;
            if (streakflag) {
                if(guesses === -3) {
                    record.streak = record.streak + 1;
                } else {
                    record.streak = 0;
                }
            }
            

            foundUser.records[i] = record;

            console.log("EDITING RECORD FOR: " + category)
            const result = await foundUser.save();
            
            return res.status(200).send(result);

        }
    }
    
    if (user && category) {

        console.log("CREATING RECORD FOR: " + category);

        const record = {
            category: category,
            guesses: guesses,
            attempted: 1,
            streak: 0,
        }

        foundUser.records[foundUser.records.length] = record;

        console.log(foundUser.records);

        const result = await foundUser.save();
    
        return res.status(201).send(result);
    }

}


module.exports = { receiveResults };