import React, { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Square, Piece } from "react-chessboard/dist/chessboard/types";
import { useAppDispatch, useAppSelector } from "../../app-state/hooks";
import { setGameState } from "../../app-state/features/gameSlice";
import { Chess } from "chess.js";
import { useState } from "react";
import { socket } from "../../socket";

const boardWidth = (window.innerHeight * 80 * 75) / 10000;

const StandardOnlineBoard = (props: any) => {
	
	const dispatch = useAppDispatch();
	const [position, setPosition]= useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ')
	const [optionSquares, setOptionSquares] = useState({});
	
	const sendMove = (source: Square, target: Square, piece:Piece) => {
		socket.emit("send_move", { source: source, target:target, piece:piece, room: props.room }, (position:string)=>{
			setPosition(position);
		});
	};
	socket.on("recieve_move", (position) => {
		console.log(position);
	});
		
	const handleDrop = (source: Square, target: Square, piece: Piece) => {
		setOptionSquares({});
		sendMove(source, target, piece)
		return true;
	};
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
