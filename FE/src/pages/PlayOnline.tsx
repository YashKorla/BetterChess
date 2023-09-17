import React from 'react'
import Typography  from '@mui/material/Typography';
import { BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const PlayOnline = () => {

    const [time,setTime]=useState(5);


    return (
    <>
    <Typography variant={'subtitle1'}>Select time</Typography>
    <BottomNavigation
        showLabels
        value={time}
        onChange={(event, newValue) => {
            setTime(newValue);
        }}
    >
        <BottomNavigationAction label="5min" value={5} />
        <BottomNavigationAction label="10min" value={10}/>
        <BottomNavigationAction label="15min" value={15}/>
    </BottomNavigation>
    <NavLink
    to='/play/game'
    state={time}
    >
        <Button color='secondary' variant='contained'>Play</Button>
    </NavLink>
    </>
  )
}

export default PlayOnline