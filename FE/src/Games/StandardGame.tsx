import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import StandardOnlineBoard from "../components/chessboards/StandardOnlineBoard";
import { Box, Modal } from "@mui/material";
import Timer from "../utilities/Timer";
import GameControls from "../utilities/GameControls";
import { useAppSelector } from "../app-state/hooks";
import ResultModal from "../utilities/ResultModal";
import { socket } from "../socket";

const StandardGame = () => {
	const location = useLocation();
	const time = new Date();
	time.setSeconds(time.getSeconds() + location.state.time * 60);
	const opponent = location.state.color === "white" ? "black" : "white";

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
				<Timer
					avatar=""
					name={opponent}
					rating={500}
					expiryTimestamp={time}
					player={opponent}
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
				/>
			</Box>
			<GameControls />
		</Box>
	);
};

export default StandardGame;
