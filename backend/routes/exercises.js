// Used towards CRUD applications towards the API 

const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// This code runs when our url is a ../excercises/ 
router.route('/').get((req, res) => {
    // .find() is a mongoose method in which will get a list of all the exercises from the MongoDB 
    // res.json() is a function which returns something in json format, in this case 'exercises'
    // we add a .catch in case of error and return a status 400 in json format 
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This code runs when our url is a ../users/add and is a post request (adds stuff)
router.route('/add').post((req, res) => {
    // Gets the username which we want to add from the req (request) body
    const username = req.body.username; 
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    console.log(req)
    // Creates a new instance of user with username
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    // Mongoose method .save() which adds our instance of user into the MongoDB  
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// Standard method for exporting a router which will be used for all routing files 
module.exports = router;

