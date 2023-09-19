import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../theme';
import IconButton from '@mui/material/IconButton/IconButton';

import { useTheme } from '@emotion/react';

const FormatBox =styled(IconButton)({
    backgroundColor:`${theme.palette.primary.main}`,
    margin:'0px 0 30px 150px',
    padding:'20px',
    borderRadius:'20px',
    border:'solid 1px #5E5E5E87',
    width:'450px',
    height:'180px',
    boxShadow:'0px 2px #5E5E5E40',
    display:'flex',    
    flexDirection:'column',
    alignItems:'start',
    justifyContent:'start',
    textAlign:'start',
    [theme.breakpoints.up('laptop')]: {
        margin:'0px 0 30px 150px',
        width:'530px',
        height:'200px',
        padding:'25px',
    },  

    
})
const FormatText =styled(Typography)({
    color:'white',
    fontSize:'32px',
    fontWeight:700, 
    
    [theme.breakpoints.up('laptop')]: {
        fontSize:'36x',
    },  
})
const FormatDesc =styled(Typography)({
    color:'white',
    fontSize:'16px',
    fontWeight:700,
    [theme.breakpoints.up('laptop')]: {
        fontSize:'18px',
    },  
})
const MainBox=styled(Box)({
    padding:'70px 0 0 40px',[theme.breakpoints.up('laptop')]: {padding:'100px'}
})


const Play = ()=>{
    const theme= useTheme()
    return(
        <MainBox>
            <FormatBox>
                
                <FormatText>Online</FormatText>
                
                <FormatDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ornare elit, hendrerit gravida velit molestie luctus. Nunc semper neque.</FormatDesc>
                
            </FormatBox>
            <FormatBox>
                <FormatText>vs Computer</FormatText>
                <FormatDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ornare elit, hendrerit gravida velit molestie luctus. Nunc semper neque.</FormatDesc>
            </FormatBox>
            <FormatBox>
                <FormatText>vs AI</FormatText>
                <FormatDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ornare elit, hendrerit gravida velit molestie luctus. Nunc semper neque.</FormatDesc>
            </FormatBox>
        </MainBox>
    )
}
export default Play;