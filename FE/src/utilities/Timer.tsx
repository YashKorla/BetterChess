import React, { useEffect } from 'react'
import { Box, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTimer } from 'react-timer-hook';
import {useAppSelector } from '../app-state/hooks';
import { ternaryOperator } from './../utils';

const Timer = (props:any) => {
    const theme=useTheme();
    const {avatar,name,rating,expiryTimestamp,player}=props;
    const timer = useTimer({ expiryTimestamp, autoStart:true, onExpire: () => console.warn('onExpire called') });
    const timerState = ternaryOperator(
        player==='white',
        useAppSelector((state)=>{return state.game.gameState.isWhiteTimerRunning}),
        useAppSelector((state)=>{return state.game.gameState.isBlackTimerRunning})
        )

    useEffect(()=>{
        if (timerState){
            timer.resume();
        }
        else{
            timer.pause()
        }
    },[timerState])

    const TimerBox=styled(Box)({
        width:'400px',
        height:'75px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:'15px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
        margin:'15px 0',
    })

    return (
        <TimerBox>
            <Avatar sx={{margin:'0 15px 0 0'}}></Avatar>
            <Box sx={{
                display:'flex',
                justifyContent:'center',
                alignItems: 'center',}}
            >
                <Typography variant="h3">{name}</Typography>
                <Typography variant="subtitle1">({rating})</Typography>
            </Box>
            <Box sx={{
                backgroundColor:`${theme.palette.primary.light}`,
                width:'140px',
                display:'flex',
                justifyContent:'center',
                alignItems: 'center',
                borderRadius:'10px',}}
                height={'90%'}
            >
                <Typography variant="h3">{timer.minutes}:{timer.seconds}</Typography>
            </Box>
        </TimerBox>
    )
    }

export default Timer