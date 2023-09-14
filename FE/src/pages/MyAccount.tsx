import React from 'react'
import Box from '@mui/material/Box' ;
import RecentGames from '../components/recentgames/RecentGames';
import ProfileInfo from '../components/profileinfo/ProfileInfo';

const MyAccount = ()=> {
  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center',paddingLeft:'40px'}}>
        <Box >
            <ProfileInfo/>
        </Box>
        <Box >
            <RecentGames/>
        </Box>
    </Box>
    
  )
}

export default MyAccount