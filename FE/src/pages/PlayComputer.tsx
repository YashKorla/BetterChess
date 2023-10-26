import React from 'react'
import Typography  from '@mui/material/Typography';
import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled } from '@mui/system';

const height = (window.innerHeight-120)*90/100;

const PlayComputer = () => {
    const theme = useTheme()
    const [depth,setDepth]=useState(1);
    const [isDisabled, setIsDisabled]= React.useState([false,false,false])
    const navigate = useNavigate()

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
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
    })

    const handleSelect = (index: number,newValue: string) => {
        const value=parseInt(newValue);
        let arr = new Array(3).fill(false);
        arr[index]=true;
        setIsDisabled(arr);
        setDepth(value);
    };

    const handlePlay = () => {
        navigate('/play/computer/game', {state:{depth:depth}});
    };

    return (
        <>
		<Box
			sx={{
				padding: "30px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box className="board-img" sx={{ height:`${height}px`, width:`${height}px`,}}>
			</Box>
			<OuterBox>
                <InnerBox>
                    <Button 
                        disabled={isDisabled[0]}
                        color='primary' 
                        variant='contained' 
                        value={1}
                        sx={{marginBottom:'20px', height:'17%', borderRadius:'10px'}} 
                        onClick={(e)=>{handleSelect(0,e.currentTarget.value)}}
                    >
                        <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                            <Typography variant="h2">Easy</Typography>
                            <Typography variant="subtitle2">Depth 3</Typography>
                        </Box>
                    </Button>
                    <Button 
                        disabled={isDisabled[1]}
                        value={5}
                        color='primary' 
                        variant='contained' 
                        sx={{marginBottom:'20px', height:'17%', borderRadius:'10px'}} 
                        onClick={(e)=>{handleSelect(1,e.currentTarget.value)}}
                    >
                        <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                            <Typography variant="h2">Medium</Typography>
                            <Typography variant="subtitle2">Depth 5</Typography>
                        </Box>
                    </Button>
                    <Button 
                        disabled={isDisabled[2]}
                        value={10}
                        color='primary' 
                        variant='contained' 
                        sx={{marginBottom:'20px', height:'17%', borderRadius:'10px'}} 
                        onClick={(e)=>{handleSelect(2,e.currentTarget.value)}}
                    >
                        <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                            <Typography variant="h2">Hard</Typography>
                            <Typography variant="subtitle2">Depth 10</Typography>
                        </Box>
                    </Button>
                </InnerBox>
                <Button 
                    variant='contained' 
                    color='secondary'
                    sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
                    onClick={handlePlay}
                >
                    <Typography variant='h2'>Play</Typography>
                </Button>
            </OuterBox>
		</Box>
		</>
  )
}

export default PlayComputer