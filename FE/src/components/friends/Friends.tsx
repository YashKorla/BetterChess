import React from 'react';
import Box from '@mui/material/Box/Box';
import theme from '../../theme';
import styled from '@emotion/styled';
import { IconButton, Typography, } from '@mui/material';

import { grey } from '@mui/material/colors';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import { friendstypes } from './Friends.Types';

const MainBox=styled(Box)({
    
    color:'white',
    backgroundColor:`${theme.palette.primary.main}`,
    display:'flex',
    alignItems:'center',
    width:'100%',
    height:'96px',
    borderRadius:'10px',
    padding:'0 0% 0 1%',   
    margin:'0 0 20px 0',
    [theme.breakpoints.up('laptop')]: {
      height:'125px',      
  },


  
})

const ImageBox  =styled(Box)({
  backgroundColor:'#D9D9D9',
  height:'100%',
  width:'100px',
  borderRadius:'5px',
  [theme.breakpoints.up('laptop')]: {
    width:'125px'     
},
})

const FriendText  =styled(Box)({
  backgroundColor:`${theme.palette.primary.main}`,
  // backgroundColor:'red',
  margin:' 0 0 0 50px',
  height:'100%',
  display:'flex',
  justifyContent:'center',
  alignItems:'flex-start',
  flexDirection:'column',
  width:'640px',
  [theme.breakpoints.up('laptop')]: {
    width:'750px'     
  },


})
const Nametext  =styled(Typography)({
  fontSize:'32px',
  fontWeight:700,
  [theme.breakpoints.up('laptop')]: {
   fontSize:'40px'     
  },

})

const Desctext  =styled(Typography)({
  fontSize:'16px',
  fontWeight:700,
  [theme.breakpoints.up('laptop')]: {
    fontSize:'20px'     
   },

})

const RemoveIcon =styled(PersonRemoveIcon)({
  fontSize:'40px',  
  position:'relative',
  color:grey[100],
  margin:'0 0 0 20px'
  
})
const InviteIcon =styled(AddIcon)({
  fontSize:'40px',
  margin:'0 0 0 20px',
  position:'relative',
  color:grey[100]
})
interface props{
  imageurl:string,
  nametext:string,
  desctext:string
}

const Friends=(props:friendstypes)=>{
  return(
    <MainBox>
            <ImageBox>
            {props.img}
            </ImageBox>
              <FriendText>
                <Nametext>{props.name}</Nametext>
                <Desctext>{props.desc}</Desctext>
              </FriendText>
             
              <IconButton><RemoveIcon/></IconButton>
              <IconButton><InviteIcon/></IconButton>
              
              
              
            </MainBox>
 
  )

}


export default Friends  