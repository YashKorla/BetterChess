import React from 'react'
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import StandardOnlineBoard from '../components/chessboards/StandardOnlineBoard';
import { Box, Modal } from '@mui/material';
import Timer from '../utilities/Timer';
import GameControls from '../utilities/GameControls';
import { useAppSelector } from '../app-state/hooks';
import ResultModal from '../utilities/ResultModal';

const StandardGame = () => {
    const location = useLocation()
    const time = new Date();
    time.setSeconds(time.getSeconds() + location.state*60);
    return (
        <Box sx={{padding:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{position:'relative',marginRight:'100px'}}>
                <ResultModal/>
                <Timer 
                    avatar=''
                    name="black"
                    rating={500}
                    expiryTimestamp={time}
                    player='black'
                /> 
                    
                <StandardOnlineBoard 
                    expiryTimestamp={time}
                    opponent="opp name"
                    opponentRating={1400}
                    color="white"
                />

                <Timer 
                    avatar=''
                    name="black"
                    rating={500}
                    expiryTimestamp={time}
                    player='white'
                />
            </Box>
            <GameControls/>
        </Box>
    )
}

export default StandardGame