import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app-state/hooks'
import { Box, Typography, useTheme, Button } from '@mui/material';
import { closeModal } from '../app-state/features/gameSlice';
import { socket } from '../socket';

const ResultModal = () => {
    const theme = useTheme()
    const [open,setOpen] = useState(false)
    const [result, setResult] = useState('Draw')

    useEffect(() =>{
        socket.on('send_result', (result) =>{
            setResult(result.result);
            setOpen(true);
        })
    },[socket])
    const handleClose = () => {
        setOpen(false);
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