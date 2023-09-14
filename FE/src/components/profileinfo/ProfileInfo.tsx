import * as React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography'
import { profileinfodetail } from './ProfileInfoData';
import editlogo from '../../image/Profileinfoediticon.svg';
import theme from '../../theme';

const ProfileInfoBox = styled(Box)({
    height:'220px',
    width:'700px',
    display:'flex',
    backgroundColor:' #171719',
    marginTop:'30px',    
    borderRadius:'20px',
    [theme.breakpoints.up('laptop')]: {
        height:'277px',
        width:'817px',
        marginTop:'44px',  
    },
})

const ProfileInfoImage=styled(Box)({
    height:'180px',
    width:'180px',
    margin:'20px',
    borderRadius:'10px',
    backgroundColor:' #222226', 
    [theme.breakpoints.up('laptop')]: {
        height:'190px',
        width:'217px',         
        margin:'30px',

    },
})


const ProfileInfoHeader=styled(Typography)({
    fontSize:'45px',
    fontWeight:700,
    color:'white',
    padding:'20px 0 0 5px',
    [theme.breakpoints.up('laptop')]: {
        fontSize:'45px',
        fontWeight:700,
        padding:'30px 0 0 30px',
    },

})

const ProfileInfoDesc=styled(Typography)({
    fontSize:'18px',
    fontWeight:700,
    color:'#69696E',
    padding:'45px 0 0 10px',
    [theme.breakpoints.up('laptop')]: {
        fontSize:'20px',
        fontWeight:700,
        padding:'68px 0 0 18px',
    },
    
})

const ProfileinfoEdit=styled(Box)({
    marginTop:'45px',
    position:'absolute',
    right:'20px',
    maxHeight:'30px',
    maxWidth:'30px',
    [theme.breakpoints.up('laptop')]: {
        marginTop:'56px',
        right:'30px',
    },
})

const RatingdisplayBox=styled(Box)({
    padding:'10px',
    backgroundColor:'#222226',
    margin:'15px  20px 0 0',
    borderRadius:'20px',
    height:'100px',
    width:'140px',
    color:'white',
    [theme.breakpoints.up('laptop')]: {
        margin:'17px 0 30px 0',
        height:'130px',
        width:'159px',
        
    },

})


interface props {
    type:string;
    rating:string;
    
}
const Ratingdisplay=({type,rating}:props)=>{
    return(
    
        <RatingdisplayBox>   
            <Typography sx={{fontSize:'20px',display:'flex',justifyContent:'center'}}>
                {type}
            </Typography>
            <Typography sx={{fontSize:'40px',display:'flex',justifyContent:'center'}}>
                {rating}
            </Typography>  
        </RatingdisplayBox>      
   
    )
}


const ProfileInfo = () => {
  return (
    <ProfileInfoBox>        
        {
            profileinfodetail.map((item,index)=>(
              < Box key="item.id" sx={{display:'flex'}}>
                
                <ProfileInfoImage>{item.userImage}</ProfileInfoImage>
                <Box>
                    <Box sx={{display:'flex',position:'relative'}}>
                        <ProfileInfoHeader>{item.userName}</ProfileInfoHeader>
                        <ProfileInfoDesc>{item.desc}</ProfileInfoDesc>
                        <ProfileinfoEdit >
                            <img src={editlogo} height={'30px'} width={'30px'}/>
                        </ProfileinfoEdit>  
                    </Box>
                    <Box sx={{display:'flex'}}>
                        <Ratingdisplay type='Blitz' rating={item.rating.bltiz}></Ratingdisplay> 
                        <Ratingdisplay type='Bullet' rating={item.rating.bullet}></Ratingdisplay>                    
                        <Ratingdisplay type='Rapid' rating={item.rating.rapid}></Ratingdisplay>  
                    </Box>
                     
                </Box>
                
              </Box>
            ))
        }
        
    </ProfileInfoBox>

  )
}

export default ProfileInfo