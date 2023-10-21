import React from "react";
import Typography from "@mui/material/Typography";
import { BottomNavigation, BottomNavigationAction, Button, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { socket } from "../socket";

const PlayOnline = () => {
	const [time, setTime] = useState(5);
	const [color, setColor] = useState("white");
	const [room, setRoom] = useState(Number);
	const navigate = useNavigate();
	var colors = ["black", "white"];

	function createGame() {
		const selectedColor = colors[Math.floor(Math.random() * colors.length)];
		setColor(() => {
			return selectedColor;
		});
		console.log(color, selectedColor);
		socket.connect();
		socket.emit("create_game", { room: room, color: color });
		navigate("/play/online/game", { state: { time: time, color: color, room: room } });
	}

	function controlRoom(e: any) {
		setRoom(typeof parseInt(e.target.value) === typeof 0 ? parseInt(e.target.value) : 0);
	}

	return (
		<>
			<Typography variant={"h3"}>Select time</Typography>
			<BottomNavigation
				showLabels
				value={time}
				onChange={(event, newValue) => {
					setTime(newValue);
				}}
			>
				<BottomNavigationAction
					label="5min"
					value={5}
				/>
				<BottomNavigationAction
					label="10min"
					value={10}
				/>
				<BottomNavigationAction
					label="15min"
					value={15}
				/>
			</BottomNavigation>
			<TextField
				label="enter room"
				variant="filled"
				value={room}
				type="number"
				onChange={(e) => {
					controlRoom(e);
				}}
			/>

			<Button
				color="secondary"
				variant="contained"
				onClick={() => {
					createGame();
				}}
			>
				Play
			</Button>
		</>
	);
};

export default PlayOnline;
