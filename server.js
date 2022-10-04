require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnect');

const Question = require('./models/Question');

async function getQuestions() {
    let response = await axios.get("https://the-trivia-api.com/api/questions?categories=general_knowledge,science,music,history,geography&limit=1&region=US&difficulty=medium");
    let category = response.data.map(item => item.category);
    let question = response.data.map(item => item.question);
    let correct = response.data.map(item => item.correctAnswer);
    let incorrect = response.data.map(item => item.incorrectAnswers);

    console.log(response);

    console.log(category[0]);
    console.log(question[0]);
    console.log(correct[0]);
    console.log(incorrect[0]);

    const result = await Question.create({ 

        "category": category[0],
        "question": question[0],
        "correct": correct[0],
        "incorrect": incorrect[0],

    });

}

getQuestions();


//DB Connection
connectDB();

app.use(express.json());

//Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));



app.use(cors(corsOptions));

PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send("Hello World");
})

mongoose.connection.once('open', () => {
    console.log("Connected to Database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});