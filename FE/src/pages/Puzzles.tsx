import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../theme';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const FormatBox =styled(Box)({
    backgroundColor:`${theme.palette.primary.main}`,
    margin:'0px 0 30px 150px',
    padding:'25px',
    borderRadius:'20px',
    border:'solid 1px #5E5E5E87',
    width:'450px',
    height:'180px',
    boxShadow:'0px 2px #5E5E5E40',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between',

    [theme.breakpoints.up('laptop')]: {
        margin:'0px 0 30px 150px',
        width:'530px',
        height:'200px',
        padding:'25px',
    
    },  
    
})
const FormatHeader =styled(Typography)({
    color:'white',
    fontSize:'32px',
    fontWeight:700,
    [theme.breakpoints.up('laptop')]: {
        fontSize:'36x',
    },  
})
const Formatbest =styled(Typography)({
    color:'white',
    fontSize:'24px',
    fontWeight:700,
    [theme.breakpoints.up('laptop')]: {
        fontSize:'18px',
    },  
})
const Formatdesc =styled(Typography)({
    color:'white',
    fontSize:'16px',
    fontWeight:700,
    bottom:'10px',
    [theme.breakpoints.up('laptop')]: {
        fontSize:'18px',
    },  
})
const MainBox=styled(Box)({
    padding:'70px 0 0 40px',[theme.breakpoints.up('laptop')]: {padding:'100px'}
})

const IconStyled=styled(KeyboardArrowRightOutlinedIcon )({
    color:'white',
    width:'40px',
    height:'40px',
    backgroundColor:`${theme.palette.primary.light}`,
    borderRadius:'80px'


})
const Puzzles = ()=>{
    return(

        <MainBox>
            <FormatBox>
                <Box sx={{display:'flex',justifyContent: 'space-between',}}>
                <FormatHeader>3 minutes</FormatHeader>
                <IconStyled></IconStyled>
                </Box>
                <Formatbest>Best: 15</Formatbest>
                <Formatdesc>Solve as many puzzles as possible in 3 mins!</Formatdesc>
            </FormatBox>
            <FormatBox>
                <Box sx={{display:'flex',justifyContent: 'space-between',}}>
                    <FormatHeader>5 minutes</FormatHeader>
                    <IconStyled></IconStyled>
                </Box>
                <Formatbest>Best: 30</Formatbest>
                <Formatdesc>Solve as many puzzles as possible in 5 mins!</Formatdesc>
            </FormatBox>
            <FormatBox>
                <Box sx={{display:'flex',justifyContent: 'space-between',}}>
                    <FormatHeader>Survival</FormatHeader>
                    <IconStyled></IconStyled>
                </Box>
                <Formatbest>Best: 55</Formatbest>
                <Formatdesc>3 mistakes and you lose!</Formatdesc>
            </FormatBox>
            
        </MainBox>
        
    )
}
export default Puzzles;