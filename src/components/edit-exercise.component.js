import React, { useState, useEffect } from 'react';
import { TextField, Box, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    forms: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '75%',
        },
    },
    linkElement: {
        textDecoration: 'None',
    },
    introButton: {
        textDecoration: 'None',
        width: 'auto',
        height: 'auto',
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const EditExercise = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [description, setDesciption] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/exercises/'+props.match.params.id)
        .then(response => {
          setUsername(response.data.username)
          setDesciption(response.data.description)
          setDuration(response.data.duration)
          setDate(new Date(response.data.date))
        })

      axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            setUsers(response.data.map(user => user.username))
          }
        })
    }, [])
    
    const submitForm = (event) => {
        event.preventDefault();

        const exerciseInfo = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }
        
        /* Super important, some asyncronous stuff going on here, the exerciseInfo console.log will run before the POST request
           so if we have history.push outside of the POST it will redirect to our exercise list page and THEN send then POST 
           so when our useEffect in exercise-list.component.js runs, it will fetch a version that does not contain the updated exercise list
        */
        axios.post('http://localhost:5000/exercises/update/'+props.match.params.id, exerciseInfo)
            .then(res => {
              console.log(res.data) 
              history.push("/")
            });
        console.log(exerciseInfo)
    }

    return (
      <Box py={10} className={classes.container}>
        <Box >
          <form className={classes.forms} noValidate autoComplete="off">
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={username}
                name="username"
                onChange={event => setUsername(event.target.value)}
                label="Age"
                >
                {users.map( (user) =>
                    <MenuItem key={user} value={user} >{user}</MenuItem>
                )}
                </Select>
              </FormControl>
              <TextField
              label="Description"
              name="description"
              type="text"
              value={description}
              variant="outlined"
              onChange={event => setDesciption(event.target.value)}
              />
              <TextField
              label="Duration"
              type="text"
              name="duration"
              value={duration}
              variant="outlined"
              onChange={event => setDuration(event.target.value)}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                name="date"
                format="MM/dd/yyyy"
                value={date}
                onChange={date => setDate(date)}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
              </MuiPickersUtilsProvider>
            </div>
              <Button variant="outlined" onClick={submitForm}>
                    Update Exercise 
              </Button>
          </form>
        </Box>  
      </Box>
    );
}

export default EditExercise;
