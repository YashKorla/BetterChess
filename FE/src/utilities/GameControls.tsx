import React from 'react'
import { useAppDispatch, useAppSelector } from '../app-state/hooks';
import { useTheme, styled, Box, Typography, Button } from '@mui/material';
import { TypeFormatFlags } from 'typescript';
import { setWinner } from '../app-state/features/gameSlice';

const height = window.innerHeight*80*75/10000;

const GameControls = () => {
    const pgn = useAppSelector((state)=> state.game.gameState.pgn)
    const opponent = useAppSelector((state)=> state.game.gameState.opponent)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    
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
        dispatch(setWinner('opponent.color'))
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
                <Typography variant='h2'>Draw</Typography>
            </Button>
            <Button 
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
            >
                <Typography variant='h2'>Resign/Abort</Typography>
            </Button>
        </OuterBox>
    )
}

export default GameControls