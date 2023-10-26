import React from "react";
import { Box, CircularProgress, Typography, Button} from "@mui/material";
import PuzzleBoard from "../components/chessboards/PuzzleBoard";
import { useTheme} from "@mui/system";
import { useAppDispatch, useAppSelector } from "../app-state/hooks";
import PuzzleScore from "../utilities/PuzzleScore";
import { useLocation } from "react-router-dom";
import { closeScoreModal } from "../app-state/features/puzzleSlice";
import PuzzleTimer from "../utilities/PuzzleTimer";

const PuzzleGame = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

    const time = new Date();
    const timeSelected = location.state.time;
    const showBuffer = useAppSelector((state)=>{
        return state.puzzle.isLoading;
    })
    const theme = useTheme();

    timeSelected ? time.setSeconds(time.getSeconds() + timeSelected * 60) : time.setSeconds(time.getSeconds() + 5 * 60);

	const open = useAppSelector((state)=>{
		return state.puzzle.toClose;
	});
	const score = useAppSelector((state)=>{
		return state.puzzle.scoreCounter;
	});
	
	return (
		<Box
			sx={{
				padding: "30px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box sx={{ position: "relative", marginRight: "100px" }}>
				<Box sx={{
					height:'200px',
					width:'200px',
					border:'2px solid white',
					backgroundColor:theme.palette.primary.dark,
					borderRadius:'10px',
					position:'absolute',
					top:0,
					bottom:0,
					left:0,
					right:0,    
					margin:'auto',
					zIndex:'10',
					display:`${open? '' : 'none'}`
				}}>
					<Typography variant='h3'>
						Your Score: {score}
					</Typography>
					<Button onClick={()=>{dispatch(closeScoreModal())}} color='secondary' variant='contained'>x</Button>
				</Box>
				<Box display={`${showBuffer ? '' : 'none'}`} 
					sx={{
						height:'50px',
						width:'50px',
						position:'absolute', 
						top:0,
						bottom:0,
						left:0,
						right:0,    
						margin:'auto',
						zIndex:'10',
						}}>
					<CircularProgress size={48}/>
				</Box>
				{!showBuffer && <PuzzleBoard/>}
                {timeSelected && 
				<PuzzleTimer time={time}/>}
			</Box>
			<PuzzleScore/>
		</Box>
	);
};

export default PuzzleGame;