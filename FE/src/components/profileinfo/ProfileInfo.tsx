import * as React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography'
import { profileinfodetail } from './ProfileInfoData';
import editlogo from '../../image/Profileinfoediticon.svg';

const ProfileInfoBox = styled(Box)({
    height:'240px',
    width:'817px',
    display:'flex',
    backgroundColor:' #171719',
    marginTop:'100px',
    marginLeft:'150px',
    borderRadius:'20px'

})

const ProfileInfoImage=styled(Box)({
    height:'180px',
    width:'190px',
    margin:'20px',
    borderRadius:'10px',
    backgroundColor:' #222226', 
    padding:'10px'   
})


const ProfileInfoHeader=styled(Typography)({
    fontSize:'50px',
    fontWeight:700,
    color:'white',
    paddingLeft :'10px',
    paddingTop:'20px',
    paddingBottom:'0px'
    
})

const ProfileInfoDesc=styled(Typography)({
    fontSize:'20px',
    fontWeight:700,
    color:'#69696E',
    paddingTop:'50px',
    paddingLeft:'10px'
})

const ProfileinfoEdit=styled(Box)({
    marginTop:'45px',
    position:'absolute',
    right:'0px'
})

const RatingdisplayBox=styled(Box)({
    padding:'10px',
    backgroundColor:'#222226',
    margin:'12px',
    borderRadius:'20px',
    height:'90px',
    width:'140px',
    color:'white'
})


interface props {
    type:string;
    rating:string;
    
}
const Ratingdisplay=({type,rating}:props)=>{
    return(
    
        <RatingdisplayBox>   
            <Typography sx={{fontSize:'17px',display:'flex',justifyContent:'center'}}>
                {type}
            </Typography>
            <Typography sx={{fontSize:'44px',display:'flex',justifyContent:'center'}}>
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
                    <Box sx={{display:'flex',width:'550px',position:'relative'}}>
                        <ProfileInfoHeader>{item.userName}</ProfileInfoHeader>
                        <ProfileInfoDesc>{item.desc}</ProfileInfoDesc>
                        <ProfileinfoEdit >
                            <img src={editlogo} height='40px' width='40px'/>\
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