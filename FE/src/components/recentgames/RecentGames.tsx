import React from 'react';
import Box from '@mui/material/Box/Box';
import theme from '../../theme';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { recentgamedata } from './RecentGameData';


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

interface props{
    format:string,
    player1:string,
    player2:string,
    result:boolean,
    draw:boolean,
    accuracy:string,
    date:string,
}
const GameBox=({format,player1,player2,result,draw,accuracy,date}:props)=>{
    return(
        <StyledGameBox>
        
        <Box sx={{display:'inline-flex',color:'white'}}>
            
            <Gameformat><Rowtext>{format}</Rowtext></Gameformat>
            <Box>
                <Playertext><Rowtext>{player1}</Rowtext></Playertext>
                <Playertext><Rowtext>{player2}</Rowtext></Playertext>
            </Box>
            <Box>
                {draw?<Winnertext><Rowtext>0</Rowtext></Winnertext>:result?<Winnertext><Rowtext>1</Rowtext></Winnertext>:<Winnertext><Rowtext>0</Rowtext></Winnertext>}
                {draw?<Winnertext><Rowtext>0</Rowtext></Winnertext>:result?<Winnertext><Rowtext>0</Rowtext></Winnertext>:<Winnertext><Rowtext>1</Rowtext></Winnertext>}
            </Box>
            {draw?<SymbolBox><Rowtext>=</Rowtext></SymbolBox>:result?<SymbolBox><Rowtext>+</Rowtext></SymbolBox>:<SymbolBox><Rowtext>-</Rowtext></SymbolBox>}

            <Reviewtext><Rowtext>Review</Rowtext></Reviewtext>
            <Accuracytext><Rowtext>{accuracy}</Rowtext></Accuracytext>
            <Datetext><Rowtext>{date}</Rowtext></Datetext>
            </Box>
            
        </StyledGameBox>
    )
}

const RecentGames = () => {
  return (
    <Box>   
    <RecentgameText>Recent Games</RecentgameText>     
        
   
    <MainBox >
    {recentgamedata.map((item,index)=>(
        <GameBox format={item.format} player1={item.player1} player2={item.player2} result={item.result} draw={item.draw} accuracy={item.accuracy} date={item.date}></GameBox>
    ))}
    </MainBox>
     </Box>
  )
}

export default RecentGames