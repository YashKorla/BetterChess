import React from 'react'
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { StandardBoard } from '../components/chessboard/chessboard';
import { Box } from '@mui/material';

const StandardGame = () => {
    const location = useLocation()
    const time = new Date();
    time.setSeconds(time.getSeconds() + location.state*60);
    return (
        <Box sx={{padding:'30px'}}>
            <StandardBoard 
                expiryTimestamp={time}
                opponent="opp name"
                opponentRating={1400}
                color="white"
            />
        </Box>
    )
}

export default StandardGame