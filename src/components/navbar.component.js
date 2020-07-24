import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkFormat: {
      textDecoration: "None",
      color: "white",
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Event Planner
          </Typography>
          <Link to="/" className={classes.linkFormat}>
            <Button color="inherit">Events</Button>
          </Link>
          <Link to ="/create" className={classes.linkFormat}>
            <Button fontSize={16} color="inherit">Create New Event</Button>
          </Link>
          <Link to="/user" className={classes.linkFormat}>
            <Button color="inherit">Create User</Button>    
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;