import React from 'react'
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import StandardBotBoard  from '../components/chessboards/StandardBotBoard';
import { Box, Modal } from '@mui/material';
import Timer from '../utilities/Timer';
import GameControls from '../utilities/GameControls';
import { useAppSelector } from '../app-state/hooks';
import ResultModal from '../utilities/ResultModal';

const StandardBotGame = () => {
    const location = useLocation()
    
    return (
        <Box sx={{padding:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{position:'relative',marginRight:'100px'}}>
                <ResultModal/>  
                <StandardBotBoard
                    depth={location.state}
                    color="white"
                />
            </Box>
            <GameControls/>
        </Box>
    )
}

export default StandardBotGame