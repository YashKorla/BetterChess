import React from 'react'
import Box from '@mui/material/Box' ;
import RecentGames from '../components/recentgames/RecentGames';
import ProfileInfo from '../components/profileinfo/ProfileInfo';
import { profileinfodetail } from '../components/profileinfo/ProfileInfoData';
import styled from '@emotion/styled';
import theme from '../theme';
import {recentgamedata} from  '../components/recentgames/RecentGameData'

const RecentgameText=styled(Box)({
  background:`${theme.palette.primary.main}`,
  color:'white',
  height:'30px',
  width:'120px',
  padding:'5px 5px 0 10px',
  borderRadius:'10px 10px 0 0',
  fontSize:'16px',
  [theme.breakpoints.up('laptop')]: {    
      fontSize:'20px',       
      width:'151px', 
      padding:'9px 10px 2px 10px',     
  },      
})

const MainBox=styled(Box)({
  height:'420px',
  width:'1200px',   
  background:`${theme.palette.primary.main}`,    
  justifyContent:'center',
  alignItems:'center',
  overflow:'hidden',
  overflowY:'scroll', 
  borderRadius:'0 10px 10px 10px',    
  padding:'0px 10px 20px 10px',
  position:'initial',
  
  '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background:`${theme.palette.primary.main}`,
      borderRadius: '100px',
      
    },
    '&::-webkit-scrollbar-track': {
      background:`${theme.palette.primary.main}`,
      borderRadius:'30px',
      margin:'10px 0 10px 0'
    },
    [theme.breakpoints.up('laptop')]: {
      width:'1050px',   
      height:'523px',
      padding:'0px 15px 30px 15px',          
  },
})

const MyAccount = ()=> {
  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
        <Box >
          {
            profileinfodetail.map((item,index)=>(

              <ProfileInfo UserImage={item.userImage} Username={item.userName} Desc={item.desc} Bltizrating={item.bltizrating} Bulletrating={item.bulletrating} Rapidrating={item.rapidrating} />
              
            ))}
        </Box>
        <Box>
          
          <RecentgameText>Recent Games</RecentgameText>     
        
   
            <MainBox >
            {recentgamedata.map((item,index)=>(
                <RecentGames format={item.format} player1={item.player1} player2={item.player2} result={item.result} draw={item.draw} accuracy={item.accuracy} date={item.date}></RecentGames>
            ))}
            </MainBox>
         
        </Box>
    </Box>
    
  )
}

export default MyAccount