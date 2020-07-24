import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component"
import CreateUser from "./components/create-user.component";
import { Grid } from '@material-ui/core';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Grid container spacing={2}> 
        <Grid item xs={2}/>
        <Grid item xs={8}> 
         <div className="App">
            <br/>
            <Route path="/" exact component={ExercisesList} />
            <Route path="/edit/:id" exact component={EditExercise} />
            <Route path="/create" exact component={CreateExercise} />
            <Route path="/user" exact component={CreateUser} />
          </div>
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </Router>
  );
}

export default App;
