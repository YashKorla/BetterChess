import React from "react";
import { Chessboard } from "react-chessboard";
import { Square, Piece } from "react-chessboard/dist/chessboard/types";
import { useState } from "react";
import { socket } from "../../socket";

const boardWidth = (window.innerHeight - 120)* 80/100;

const ThreeCheckBoard = (props: any) => {

	const [position, setPosition]= useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ')
	const [optionSquares, setOptionSquares] = useState({}); 
    const [checks,setChecks]=useState(0);
	let isGameStarted = false;

	socket.on('start_game', (data) => {
        isGameStarted = true;
    })

	const sendMove = (source: Square, target: Square, piece:Piece) => {
		let wasMoveSuccessful = false;
		socket.emit("send_move", { source: source, target:target, piece:piece, room: props.room }, (data:any)=>{
			setPosition(data.position);
			data.isCheck ? setChecks((prev:number)=>{return prev+1}) : setChecks((prev:number)=>{return prev});
			if(checks === 2){socket.emit('set_winner', {winner: props.color, room: props.room})}
			wasMoveSuccessful = data.success;
		});
		return wasMoveSuccessful
	};
	
	socket.on("recieve_move", (position) => {
		setPosition(position);
	});
		
	const handleDrop = (source: Square, target: Square, piece: Piece) => {
		setOptionSquares({});
		if(isGameStarted){
			return false;
		}
		else if((props.color==='white' && piece[0]==='w') || (props.color==='black' && piece[0]==='b')){
			return sendMove(source, target, piece)
		}
		else{return false}
	};

	return (
		<Chessboard
			position={position}
			onPieceDrop={handleDrop}
			boardWidth={boardWidth}
			customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
			customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
			customSquareStyles={{ ...optionSquares }}
			animationDuration={100}
			arePremovesAllowed={true}
			boardOrientation={props.color}
		/>
	);
};
export default ThreeCheckBoard;