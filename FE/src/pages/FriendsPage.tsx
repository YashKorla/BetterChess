import React from 'react';
import Friends from '../components/friends/Friends'
import Box from '@mui/material/Box/Box';
import theme from '../theme';
import styled from '@emotion/styled';
import { IconButton, Typography, } from '@mui/material';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { grey } from '@mui/material/colors';
import { FriendsDetails } from '../components/friends/FriendsMockdata'
import { friendstypes } from '../components/friends/Friends.Types';


const SearchBox = styled(Box)({
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'50px',
    width:'250px',
    backgroundColor:`${theme.palette.primary.main}`,
    position:'absolute',
    margin:'20px 0 0 0',
    borderRadius:'10px',
    right:'120px',
    [theme.breakpoints.up('laptop')]: {
        height:'50px',   
        width:'264px', 
        margin:'25px 0 0 0',
        right:'150px',
    },
    
})

const SearchBoxText= styled(Typography)({
    fontSize:'16px',
    color:'white',
    margin:'10px',
    width:'100%',
    [theme.breakpoints.up('laptop')]: {
        fontSize:'20px',
    },
})


const OuterBox = styled(Box)({
    borderRadius: "0 10px 10px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    backgroundColor:`${theme.palette.primary.main}`,
    position:'relative',
    width: "1000px",
    height:'600px',
    padding: "20px 20px 0px 30px",
    margin:'90px 0 0 0',
    flexDirection:'column',
    
    [theme.breakpoints.up('laptop')]: {
        width: "1078px",
        height:'741px',
    },
  });



const HeaderBox = styled(Box)({
    top:'-35px',
    height:'35px',
    position:'absolute',
    backgroundColor:`${theme.palette.primary.main}`,
    width:'120px',
    borderRadius:'10px 10px 0 0 ',
    left:'0px',
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    [theme.breakpoints.up('laptop')]: {
        width: "150px",
        
    },

})
const HeaderText =styled(Typography)({
    fontSize:'19px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',      
    color:'white',
    
})
const ScrollBox =styled(Box)({
  width:'100%',
  overflowY:'scroll', 
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
})

const FriendsPage = ()=>{
    return(
        <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',}}>
       <SearchBox>
        <IconButton>
          <SensorOccupiedIcon sx={{ color: grey[50],fontSize:'30px',}}/>
          <SearchBoxText>Search by Username</SearchBoxText>  
        </IconButton>
        </SearchBox>
        <OuterBox>
        <HeaderBox>
               <HeaderText>Friends</HeaderText>
              
            </HeaderBox>
            <ScrollBox>   
                {
                    FriendsDetails.map((item,index)=>(
                        <Friends img={item.Imgurl} name={item.Name} desc={item.desc}></Friends>

                    ))
                                        
                }         
            
                
            </ScrollBox>
            
            

        </OuterBox>
    </Box>
    )
}
export default FriendsPage;