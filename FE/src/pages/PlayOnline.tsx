import React from "react";
import { Box} from "@mui/material";
import TimeControls from "../utilities/TimeControls";

const height = (window.innerHeight-120)*80/100;

const PlayOnline = () => {

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
			<TimeControls/>
		</Box>
		</>
	); 
};

export default PlayOnline;
