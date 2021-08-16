import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import { withStyles, alpha } from '@material-ui/core/styles';
import { Typography, Paper, Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import dateFormat from 'dateformat';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const App = (props) => {
  const classes = props.classes;
  const [destinationDate, setDestinationDate] = useState(new Date('2021-12-31T00:00:00'));
  const [start, setStart] = useState(false);
  const [leftDays, setLeftDays] = useState("");
  const [leftHours, setLeftHours] = useState("");
  const [leftMinutes, setLeftMinutes] = useState("");
  const [leftSeconds, setLeftSeconds] = useState("");

  const handleDateChange = (date) => {
    setDestinationDate(date);
  };

  const convertTime = (time) => {
    return time = time < 10 ? `0${time}` : time;
  }

  useEffect(() => {
    let countdown = null;
    if(start) {
      countdown = setInterval(() => {
        let newYearsDate = destinationDate;
        console.log(newYearsDate);
        const currentDate = new Date();
        const totalSeconds = new Date(newYearsDate - currentDate) / 1000;

        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const mins = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        setLeftDays(days);
        setLeftHours(hours);
        setLeftMinutes(mins);
        setLeftSeconds(seconds);
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [start]);

  useEffect(() => {
    console.log(destinationDate);
    setStart(false);
    setStart(true);
  }, [destinationDate]);  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box component="div" className="App">
        <Typography variant="h4" gutterBottom className={clsx(classes.title)} align="center">
          React Countdown
        </Typography>
        <Paper elevation={3} className={clsx(classes.dateWrap)}>
          <KeyboardDatePicker
            margin="normal"
            id="Destination Date"
            label="Destination Date"
            format="yyyy-MM-dd"
            value={destinationDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Change Destination Date',
            }}
          />
        </Paper>
        <Typography variant="h4" gutterBottom className={clsx(classes.destiDate)} align="center">
          {dateFormat(destinationDate,'yyyy-mm-dd')}
        </Typography>        
        {start && (
          <Typography variant="h4" className={clsx(classes.clock)} align="center">
            {leftDays} Days {leftHours} Hours {leftMinutes} Minutes {leftSeconds} Seconds Left ...
          </Typography>         
        )}          
      </Box>
    </MuiPickersUtilsProvider>
  );
}

const styles = {
  title: {
    color: 'white',
    fontFamily: 'Inconsolata'
  },
  clock: {
    margin: '0.5em 0 0',
    color: 'white',
    fontFamily: 'Inconsolata'
  },
  dateWrap: {
    maxWidth: 220,
    margin: '0 auto',
    padding: '0.5rem 1rem'
  },
  destiDate: {
    color: 'white',
    fontFamily: 'Inconsolata',    
    margin: '2rem 0 0'
  }
};

export default withStyles(styles)(App);