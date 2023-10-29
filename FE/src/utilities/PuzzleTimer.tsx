import React, { useEffect } from 'react'
import { useTheme, styled, Box, Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import { quitPuzzles } from '../app-state/features/puzzleSlice';
import { useAppDispatch, useAppSelector } from '../app-state/hooks';

const PuzzleTimer = (props:any) => {

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isRunning = useAppSelector((state)=>{
        return state.puzzle.isTimerRunning;
    })

    const TimerBox=styled(Box)({
        width:'400px',
        height:'75px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        padding:'15px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
        margin:'15px 0',
    })

    useEffect(()=>{
        if(isRunning===false){
            timer.pause();
        }
    },[isRunning]);

    const timer = useTimer({ expiryTimestamp:props.time, autoStart:true, onExpire: () => {dispatch(quitPuzzles())} });

    return (
        <TimerBox>
            <Typography variant="h3">{timer.minutes}:{timer.seconds}</Typography>
        </TimerBox>
    )
}

export default PuzzleTimer