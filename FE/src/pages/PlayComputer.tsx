import React from 'react'
import Typography  from '@mui/material/Typography';
import { BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const PlayComputer = () => {

    const [depth,setDepth]=useState(2);


    return (
    <>
    <Typography variant={'h3'}>Select Difficulty</Typography>
    <BottomNavigation
        showLabels
        value={depth}
        onChange={(event, newValue) => {
            setDepth(newValue);
        }}
    >
        <BottomNavigationAction label="Easy" value={2} />
        <BottomNavigationAction label="Medium" value={5}/>
        <BottomNavigationAction label="Hard" value={8}/>
    </BottomNavigation>
    <NavLink
    to='/play/computer/game'
    state={depth}
    >
        <Button color='secondary' variant='contained'>Play</Button>
    </NavLink>
    </>
  )
}

export default PlayComputer