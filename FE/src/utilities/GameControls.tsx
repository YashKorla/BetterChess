import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app-state/hooks';
import { useTheme, styled, Box, Typography, Button } from '@mui/material';
import { TypeFormatFlags } from 'typescript';
import { setWinner } from '../app-state/features/gameSlice';
import { socket } from '../socket';

const height = window.innerHeight*80*75/10000;

const GameControls = (props:any) => {
    const [pgn,setPgn] = useState('');
    const theme = useTheme()
    
    const OuterBox=styled(Box)({
        width:'415px',   
        height:`${height}px`,
        padding:'20px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
    })  
    
    const InnerBox=styled(Box)({
        width:'100%',
        height: '70%',
        backgroundColor:theme.palette.primary.light,
        borderRadius:'10px',
        padding:'15px',
    })

    const handleResign = ()=>{
        let winner;
        if(props.color==='white'){
            winner = 'Black';
        }
        else{
            winner = 'White';
        }
        socket.emit('set_winner', {winner: winner, room: props.room})
    }

    return (
        <OuterBox>
            <InnerBox>
                <Typography variant='subtitle2'>{pgn}</Typography>
            </InnerBox>
            <Button 
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
            >
                <Typography variant='h2'>Offer Draw</Typography>
            </Button>
            <Button
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
                onClick={handleResign}
            >
                <Typography variant='h2'>Resign</Typography>
            </Button>
        </OuterBox>
    )
}

export default GameControls