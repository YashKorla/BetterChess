import React from 'react'
import { Box, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTimer } from 'react-timer-hook';

const Timer = (props:any) => {
    const theme=useTheme();
    const {avatar,name,rating,expiryTimestamp,timerState}=props;
    const timer = useTimer({ expiryTimestamp, autoStart:true, onExpire: () => console.warn('onExpire called') });

    switch(timerState) {
        case "start":
            timer.start();
            break;
        case "pause":
            timer.pause();
            break;
        case "resume":
            timer.resume();
            break;
    }

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
                <Typography variant="subtitle1">{name}</Typography>
                <Typography variant="subtitle2">({rating})</Typography>
            </Box>
            <Box sx={{
                backgroundColor:`${theme.palette.primary.light}`,
                width:'140px',
                display:'flex',
                justifyContent:'center',
                borderRadius:'10px',}}
            >
                <Typography variant="subtitle1">{timer.minutes}:{timer.seconds}</Typography>
            </Box>
        </TimerBox>
    )
    }

export default Timer