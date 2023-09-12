import React from 'react';
import  Box  from '@mui/material/Box';
import Leaderboard from '../components/leaderboard/Leaderboard';
import {formats,userStandings,standings} from '../components/leaderboard/Leaderboard.Mock';

const LeaderboardPage = ()=>{
    return(
        <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            {formats.map((item,index)=>{
                return(
                    <Leaderboard 
                        format={item}
                        userStandings={userStandings}
                        standings={standings}
                    />
                )
            })}
        </Box>
    )
}
export default LeaderboardPage;