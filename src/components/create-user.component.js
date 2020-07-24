import React, { useState, useEffect } from 'react';
import { TextField, Box, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

const CreateUser = (props) => {
    
  const classes = useStyles();

  const [username, setUsername] = useState('');

  const submitForm = (event) => {
    event.preventDefault();

    const user = {
        username: username,
    }
    console.log(user)

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data)); //This is what we refer to as a promise 
    setUsername('')
  }


  return (
    <Box py={10} className={classes.container}>
      <Box >
        <form className={classes.forms} noValidate autoComplete="off">
          <div>
            <TextField
            label="Username"
            name="username"
            type="text"
            value={username}
            variant="outlined"
            onChange={event => setUsername(event.target.value)}
            />
            </div>
            <Button variant="outlined" onClick={submitForm}>
                Create User
            </Button>
        </form>
      </Box>  
  </Box>
  );
}

export default CreateUser;
