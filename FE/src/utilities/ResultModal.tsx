import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app-state/hooks'
import { Box, Typography, useTheme, Button } from '@mui/material';
import { closeModal } from '../app-state/features/gameSlice';

const ResultModal = () => {
    const theme = useTheme()
    const dispatch  = useAppDispatch();
    const open = useAppSelector((state)=>{
        return state.game.gameState.isGameOver
    })
    const result = useAppSelector((state)=>{
        return state.game.gameState.result
    })
    const handleClose = () => {
        dispatch(closeModal())
    }
    return (
            <Box sx={{
                height:'200px',
                width:'200px',
                border:'2px solid white',
                backgroundColor:theme.palette.primary.dark,
                borderRadius:'10px',
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0,    
                margin:'auto',
                zIndex:'10',
                display:`${open? '' : 'none'}`
            }}>
                <Typography variant='h3'>
                    {result}
                </Typography>
                <Button onClick={handleClose} color='secondary' variant='contained'>X</Button>
            </Box>
    )
    }

export default ResultModal