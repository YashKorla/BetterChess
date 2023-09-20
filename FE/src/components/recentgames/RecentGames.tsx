import React from 'react';
import Box from '@mui/material/Box/Box';
import theme from '../../theme';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { recentgamedata } from './RecentGameData';
import { recentgametype } from './RecentGameTypes';




const StyledGameBox =styled(Box)({
    height:'80px',
    background:`${theme.palette.primary.light}`,
    margin:'20px  0 0 10px',   
    borderRadius:'10px',
    display:'block',
    [theme.breakpoints.up('laptop')]: {         
        height:'96px',
        margin:'30px 15px 0px 15px',          
    },
})

const Gameformat=styled(Box)({    
    padding:'25px 0 0 0',    
    width:'150px', 
    [theme.breakpoints.up('laptop')]: {         
        padding:'38px 0 0 0',    
        width:'200px',       
    },  
})

const Playertext=styled(Box)({
    padding:'5px 0 0 0px',
    width:'250px',
    [theme.breakpoints.up('laptop')]: {         
        padding:'16px 0 0 0',    
        width:'300px',       
    },  
    
})
const Winnertext =styled(Box)({
    
    padding:'5px 0 0 0',
    width:'100px',
    [theme.breakpoints.up('laptop')]: {         
        padding:'38px 0 0 0',    
        width:'150px',       
    },  
   
}) 

const Reviewtext=styled(Box)({
     
    padding:'25px 0 0 0',
    width:'300px',
    [theme.breakpoints.up('laptop')]: {         
        padding:'38px 0 0 0',    
        width:'300px',       
    },  
   
    
})
const Accuracytext=styled(Box)({
    
    padding:'25px 0 0 0 ',
   width:'150px',
   [theme.breakpoints.up('laptop')]: {         
    padding:'38px 0 0 0',    
    width:'200px',       
    },  
})
const Datetext=styled(Box)({
    padding:'25px',
    width:'200px',
    [theme.breakpoints.up('laptop')]: {         
        padding:'38px 0 0 0',    
        width:'250px',       
    },      
})
const Rowtext=styled(Typography)({
    display:'flex',
    fontSize:'20px',
    justifyContent:'center',
    alignItems:'center',
     
    
})

const SymbolBox=styled(Box)({
    background:`${theme.palette.primary.main}`,
    fontWeight:700,
    margin:'20px 0 0 0',
    height:'28px',
    width:'28px',
    borderRadius:'5px',
    [theme.breakpoints.up('laptop')]: {    
        margin:'', 
        height:'31px',
        width:'31px',   
    },
    
})


const  RecentGames=(props:recentgametype)=>{
    return(
        <StyledGameBox>
        
        <Box sx={{display:'inline-flex',color:'white'}}>
            
            <Gameformat><Rowtext>{props.format}</Rowtext></Gameformat>
            <Box>
                <Playertext><Rowtext>{props.player1}</Rowtext></Playertext>
                <Playertext><Rowtext>{props.player2}</Rowtext></Playertext>
            </Box>
            <Box>
                {props.draw?<Winnertext><Rowtext>0</Rowtext></Winnertext>:props.result?<Winnertext><Rowtext>1</Rowtext></Winnertext>:<Winnertext><Rowtext>0</Rowtext></Winnertext>}
                {props.draw?<Winnertext><Rowtext>0</Rowtext></Winnertext>:props.result?<Winnertext><Rowtext>0</Rowtext></Winnertext>:<Winnertext><Rowtext>1</Rowtext></Winnertext>}
            </Box>
            {props.draw?<SymbolBox><Rowtext>=</Rowtext></SymbolBox>:props.result?<SymbolBox><Rowtext>+</Rowtext></SymbolBox>:<SymbolBox><Rowtext>-</Rowtext></SymbolBox>}

            <Reviewtext><Rowtext>Review</Rowtext></Reviewtext>
            <Accuracytext><Rowtext>{props.accuracy}</Rowtext></Accuracytext>
            <Datetext><Rowtext>{props.date}</Rowtext></Datetext>
            </Box>
            
        </StyledGameBox>
    )
}


export default RecentGames