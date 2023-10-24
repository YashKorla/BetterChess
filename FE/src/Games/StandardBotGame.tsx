import React from 'react'
import { useLocation } from 'react-router-dom';
import StandardBotBoard  from '../components/chessboards/StandardBotBoard';
import { Box } from '@mui/material';
import GameControls from '../utilities/GameControls';
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