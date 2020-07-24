import React, { useState, useEffect } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import {red, yellow} from '@material-ui/core/colors'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ExerciseList = () => {
  const classes = useStyles();  
  const [exercises, setExercises] = useState([]);

  //We need this to constalty refresh due to the updating 
  useEffect(() => {
    console.log("hello")
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const deleteExercise = (id) => {
    console.log("doing stuff")
    axios.delete('http://localhost:5000/exercises/' +id)
      .then(res => console.log(res.data));

    setExercises(
      exercises.filter(element => element._id !== id)
    )
  }
  return (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Host</TableCell>
          <TableCell align="left">Event</TableCell>
          <TableCell align="left">Description</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {exercises.map((row) => (
          <TableRow key={row._id}>
            <TableCell component="th" scope="row">
              {row.username}
            </TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">{row.duration}</TableCell>
            <TableCell align="right">{row.date.substring(0,10)}</TableCell>
            <TableCell>
              <Link to={"/edit/" + row._id}>
                <Button className={classes.button} color="primary"> Edit </Button>
              </Link>
              <Button color="secondary" onClick={() => deleteExercise(row._id)}> Delete </Button>
            </TableCell>  
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default ExerciseList;
