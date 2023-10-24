import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import StandardOnlineBoard from "../components/chessboards/StandardOnlineBoard";
import { Box, CircularProgress} from "@mui/material";
import Timer from "../utilities/Timer";
import GameControls from "../utilities/GameControls";
import ResultModal from "../utilities/ResultModal";
import { socket } from "../socket";

const StandardGame = () => {
	const location = useLocation();
	const time = new Date();
	time.setSeconds(time.getSeconds() + location.state.time * 60);
	const opponent = location.state.color === "white" ? "black" : "white";
	const [isGameStarted, setIsGameStarted]=useState(false);

	socket.on('start_game', ()=>{
		setIsGameStarted(true);
	})
	
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
				<ResultModal />
				<Box display={`${isGameStarted ? 'none' : ''}`} 
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
				<Timer
					avatar=""
					name={opponent}
					rating={500}
					expiryTimestamp={time}
					player={opponent}
					room={location.state.room}
				/>

				<StandardOnlineBoard
					color={location.state.color}
					room={location.state.room}
				/>

				<Timer
					avatar=""
					name={location.state.color}
					rating={500}
					expiryTimestamp={time}
					player={location.state.color}
					room={location.state.room}
				/>
			</Box>
			<GameControls color={location.state.color} room={location.state.room}/>
		</Box>
	);
};

export default StandardGame;
