const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//Helps with json parser
app.use(express.json());

//uri is the database uri we get from the cloud atlas
const uri = process.env.ATLAS_URI;
//this establishes our connection to our database, as general setup keep both parameters below as true 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
})

//requiring the files and importing them 
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//loads everthing in 
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
