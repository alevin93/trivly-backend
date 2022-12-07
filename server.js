require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials')
const connectDB = require('./config/dbConnect');
const cookies = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT')
app.use(cookies());

const Question = require('./models/Question');
const Stream = require('./models/Stream');

//DB Connection
connectDB();
app.use(credentials);
app.use(cors(corsOptions));

async function getQuestions() {
    let response = await axios.get("https://the-trivia-api.com/api/questions?categories=general_knowledge,science,music,history,geography,film_and_tv&limit=20&region=US&difficulty=medium");
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

    setTimeout(getQuestions, 3000);

}

async function getrandomquestion(category) {
    const questions = await Question.find({ 'category': category });
    let question = questions[Math.floor(Math.random() * questions.length)];
    return question;
}

async function makeStreams() {
    const result = await Stream.create({
        "category": "General Knowledge",
        "question": await getrandomquestion("General Knowledge"),
    });
    console.log(result);
};

//getrandomquestion("History");
//makeStreams();
//getQuestions();




app.use(express.json());

app.post('/test', (req,res) => {
    console.log("Test Route Run")
    console.log(req.body.username);
    console.log(req.body.password);
    res.sendStatus(200);
})
//Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/feed', require('./routes/feed'));
app.use('/question', require('./routes/question'));
app.use('/results', require('./routes/results'));
app.use('/getResults', require('./routes/getResults'));




PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send("Hello World");
})

mongoose.connection.once('open', () => {
    console.log("Connected to Database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});