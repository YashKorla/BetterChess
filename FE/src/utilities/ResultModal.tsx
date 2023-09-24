import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app-state/hooks'
import { Modal, Box, Typography } from '@mui/material';

const ResultModal = () => {
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
        <Modal
            open={open}
            sx={{position:'absolute',top:'center',left:'center'}}
            onClose={handleClose}
        >
            <Box sx={{
                height:'200px',
                width:'200px',
                border:'2px solid white',
            }}>
                <Typography variant='h3'>
                    {result}
                </Typography>
            </Box>
        </Modal>
    )
    }

export default ResultModal