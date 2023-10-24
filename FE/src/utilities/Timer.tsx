import React from 'react'
import { Box, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTimer } from 'react-timer-hook';
import {useAppDispatch} from '../app-state/hooks';
import { setWinner } from '../app-state/features/gameSlice';
import { socket } from '../socket';

interface timerProps {
    avatar: any,
    name:string,
    rating:number,
    expiryTimestamp: Date,
    player:string,
    room:number,
}

const Timer = (props:timerProps) => {
    const dispatch = useAppDispatch()
    const theme=useTheme();
    const {avatar,name,rating,expiryTimestamp,player,room}=props;
    const oppColor = player==='black' ? 'White' : 'Black'

    const timer = useTimer({ expiryTimestamp, autoStart:false, onExpire: () => {socket.emit('set_winner', {winner: oppColor, room: props.room})} });

    socket.on('start_game', () => {
        if(player==='white'){
            timer.start();
        }
    })

    socket.on('recieve_winner', (data)=>{
        timer.pause();
    })
    socket.on('toggle_timer', (data) => {
        if((player==='black' && data==='b') || (player==='white' && data==='w')){
            timer.resume()
        }
        else{ 
            timer.pause();
        }
    })

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