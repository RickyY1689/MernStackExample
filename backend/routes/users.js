// Used towards CRUD applications towards the API 

const router = require('express').Router();
let User = require('../models/user.model');

// This code runs when our url is a ../users/ 
router.route('/').get((req, res) => {
    // .find() is a mongoose method in which will get a list of all the users from the MongoDB 
    // res.json() is a function which returns something in json format, in this case 'users'
    // we add a .catch in case of error and return a status 400 in json format 
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This code runs when our url is a ../users/add and is a post request (adds stuff)
router.route('/add').post((req, res) => {
    // Gets the username which we want to add from the req (request) body
    const username = req.body.username; 

    // Creates a new instance of user with username
    const newUser = new User({username});

    // Mongoose method .save() which adds our instance of user into the MongoDB  
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Standard method for exporting a router which will be used for all routing files 
module.exports = router;

