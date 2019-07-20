const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors);  // allows cross origin resources
app.use(express.json()); //allow to parse json

//connection to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .catch(error => console.log(`Connection error: ${error}`));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, 'localhost', () => {
    console.log(`Server is running on port: ${port}`);
}).on('error', err => {
    console.error(`Error: ${err}`)
});