import React from "react";
import { Box} from "@mui/material";
import TimeControls from "../utilities/TimeControls";
import { useLocation } from "react-router-dom";

const height = (window.innerHeight-120)*80/100;

const PlayBlindfold = () => {

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
			<TimeControls variant="/variants/blindfold/game"/>
		</Box>
		</>
	); 
};

export default PlayBlindfold;