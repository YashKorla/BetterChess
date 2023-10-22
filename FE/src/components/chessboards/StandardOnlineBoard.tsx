import React, { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Square, Piece } from "react-chessboard/dist/chessboard/types";
import { useState } from "react";
import { socket } from "../../socket";

const boardWidth = (window.innerHeight * 80 * 75) / 10000;
let sourceSquare:Square;

const StandardOnlineBoard = (props: any) => {

	const [position, setPosition]= useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ')
	const [optionSquares, setOptionSquares] = useState({});
	let isGameStarted = false;

	socket.on('start_game', (data) => {
        isGameStarted = true;
    })

	const sendMove = (source: Square, target: Square, piece:any) => {
		let wasMoveSuccessful = false;
		socket.emit("send_move", { source: source, target:target, piece:piece, room: props.room }, (data:any)=>{
			setPosition(data.position);
			wasMoveSuccessful = data.success;
		});
		return wasMoveSuccessful
	};
	useEffect(()=>{
		socket.on("recieve_move", (position) => {
			setPosition(position);
		});
	},[socket]);
		
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

	// const handleClick = (square:Square)=>{
	// 	if(!isGameStarted){
	// 		let piece={type:'', color:''};
	// 		socket.emit('get_piece', square, (data:any)=>{
	// 			piece = data;
	// 		})
	// 		console.log('piece',piece);
	// 		if((props.color==='white' && piece.color==='w') || (props.color==='black' && piece.color==='b')){
	// 			sendMove(sourceSquare, square, piece.type);
	// 		}

	// 		sourceSquare=square;
	// 		let moves:any = [];
	// 		socket.emit('get_moves', {square: square, verbose: true}, (data:any)=>{
	// 			moves = data;
	// 		})
	// 		if (moves.length === 0) {
	// 			setOptionSquares({});
	// 			return false;
	// 		}
	// 		let newSquares = {};
	// 		moves.map((move:any) => {
	// 			const key = move.to;
	// 			newSquares = {
	// 						...newSquares,
	// 						[key]: {
	// 							background:
	// 								"radial-gradient(closest-side, #97aef3 30%, transparent 40%)",
	// 						},
	// 					};
	// 		});
	// 		setOptionSquares(newSquares);
	// 	}
	// }



	// const handleClick = (square: Square) => {
	// 	try {
	// 		const move = chess.move({ from: sourceSquare, to: square });
	// 		setOptionSquares({});
	// 		if (chess.isGameOver()) {
	// 			gameOver = true;
	// 			if (
	// 				chess.isThreefoldRepetition() ||
	// 				chess.isStalemate() ||
	// 				chess.isInsufficientMaterial()
	// 			) {
	// 				result = "draw";
	// 			}
	// 			if (chess.isCheckmate()) {
	// 				chess.turn() === "b" ? (result = "white") : (result = "black");
	// 			}
	// 		}
	// 		dispatch(
	// 			setGameState({
	// 				position: chess.fen(),
	// 				pgn: chess.pgn(),
	// 				isGameOver: gameOver,
	// 				result: result,
	// 			})
	// 		);
	// 		sendMove(move);
	// 		return true;
	// 	} catch (e) {}
	// 	sourceSquare = square;
	// 	const moves = chess.moves({ square: square, verbose: true });
	// 	if (moves.length === 0) {
	// 		setOptionSquares({});
	// 		return false;
	// 	}
	// 	let newSquares = {};
	// 	moves.map((move) => {
	// 		const key = move.to;
	// 		chess.get(key)
	// 			? (newSquares = { 
	// 					...newSquares,
	// 					[key]: {
	// 						background:
	// 							"radial-gradient(closest-side, #97aef3 80%, transparent 40%)",
	// 					},
	// 			  })
	// 			: (newSquares = {
	// 					...newSquares,
	// 					[key]: {
	// 						background:
	// 							"radial-gradient(closest-side, #97aef3 30%, transparent 40%)",
	// 					},
	// 			  });
	// 	});
	// 	setOptionSquares(newSquares);
	// };

	return (
		<Chessboard
			position={position}
			onPieceDrop={handleDrop}
			boardWidth={boardWidth}
			// onSquareClick={handleClick}
			customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
			customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
			customSquareStyles={{ ...optionSquares }}
			animationDuration={100}
			arePremovesAllowed={true}
			boardOrientation={props.color}
		/>
	);
};
export default StandardOnlineBoard;
