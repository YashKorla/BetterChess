import React from "react";
import { Box, Button, Typography, styled, useTheme} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const boardHeight = (window.innerHeight-120)*70/100;
const listHeight = (window.innerHeight-120)*90/100;

const variants = [
    {name: 'Blindfold', desc:'Players don’t see the board, memory is tested.', route:"/variants/blindfold"},
    {name: '3 Check Chess', desc:'First to give 3 checks wins', route:'3-check-chess'},
    {name: 'Hand & Brain', desc:'Team play with teams featuring one "hand" and one "brain" player.', route:'hand-and-brain'},
    {name: 'Antichess', desc:'First to lose all the pieces wins.', route:'antichess'},
]


const Variants = () => {
    const theme = useTheme()
    const navigate = useNavigate();

    const handleNavigate = (route:string)=>{
        navigate(route,{state:{variant:"/variants/blindfold"}})
    }

    const OuterBox=styled(Box)({
        width:'415px',   
        height:`${listHeight}px`,
        padding:'20px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
    })  
    
    const InnerBox=styled(Box)({
        width:'100%',
        height: '95%',
        backgroundColor:theme.palette.primary.light,
        borderRadius:'10px',
        padding:'15px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
    })

    const VariantList = () => {
        return(
            <OuterBox>
                <InnerBox>
                    {variants.map((variant:any,index)=>{
                        return (
                            <Button 
                                key={index}
                                color='primary' 
                                variant='contained' 
                                sx={{marginBottom:'20px', height:'17%', borderRadius:'10px'}} 
                                onClick={(e)=>{handleNavigate(variant.route)}}
                            >
                                <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                                    <Typography variant="h2">{variant.name}</Typography>
                                    <Typography variant="subtitle2">{variant.desc}</Typography>
                                </Box>
                            </Button>
                        )
                    })}
                </InnerBox>
            </OuterBox>
        )
    }


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
			<Box className="board-img" sx={{ height:`${boardHeight}px`, width:`${boardHeight}px`,}}>
			</Box>
			<VariantList/>
		</Box>
		</>
	); 
};

export default Variants;