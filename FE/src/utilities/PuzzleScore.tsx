import React from 'react'
import { useTheme, styled, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app-state/hooks';
import { quitPuzzles } from '../app-state/features/puzzleSlice';

const height = (window.innerHeight-120)*90/100;

const PuzleScore = () => {
    const theme = useTheme()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const score = useAppSelector((state)=>{
      return state.puzzle.scoreCounter
    })

    const puzzles = useAppSelector((state)=>{
      return state.puzzle.puzzleState.trackPuzzles
    })

    const chip = (rating: number,solved:boolean,index:number) =>{
      return(
        <Box key={index} sx={{height:'56px',width:'56px',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Box sx={{backgroundColor:`${solved?'#81b64c':'#E02828'}`,height:'30px', width:'30px' ,display:'flex', justifyContent:'center', alignItems:'center',borderRadius:'10px'}}>
            <Typography variant='subtitle2'>{index+1}</Typography>
          </Box>
          <Typography variant='subtitle2'>{rating}</Typography>
        </Box>
      )
    }
    
    const OuterBox=styled(Box)({
        width:'415px',   
        height:`${height}px`,
        padding:'20px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
    })  
    
    const InnerBox=styled(Box)({
        width:'100%',
        height: '87%',
        backgroundColor:theme.palette.primary.light,
        borderRadius:'10px',
        padding:'15px',
    })

    return (
        <OuterBox>
            <InnerBox>
              <Typography variant='h3'>Score: {score}</Typography>
              <Box sx={{display:'flex', flexWrap:'wrap'}}>
                {puzzles.map((puzzle,index)=>{
                  return chip(puzzle.rating,puzzle.solved,index)
                })}
              </Box>
            </InnerBox>
            <Button 
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
                onClick={()=>{dispatch(quitPuzzles())}}
            >
                <Typography variant='h2'>Quit</Typography>
            </Button>
        </OuterBox>
    )
}

export default PuzleScore