import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
const ProfileInfoBox = styled(Box)({
    height:'10px',
    width:'10px',
    display:'flex',
    backgroundColor:' #171719',
    
})

const ProfileInfoImage=styled(Box)({
    height:'2px',
    width:'5px',
    marginTop:'5px',
    marginLeft:'5px',
    
})

const ProfileInfo = () => {
  return (
    <ProfileInfoBox>
        <ProfileInfoImage></ProfileInfoImage>
    </ProfileInfoBox>

  )
}

export default ProfileInfo