import React, { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Square, Piece } from "react-chessboard/dist/chessboard/types";
import { useAppDispatch, useAppSelector } from "../../app-state/hooks";
import { setGameState } from "../../app-state/features/gameSlice";
import { Chess } from "chess.js";
import { useState } from "react";
import { socket } from "../../socket";

const chess = new Chess();
let gameOver = false;
let result = "";
let sourceSquare = "";

const boardWidth = (window.innerHeight * 80 * 75) / 10000;

const StandardOnlineBoard = (props: any) => {
	const sendMove = (move: any) => {
		socket.emit("send_move", { move: move, room: props.room });
		console.log("move sent");
	};
	const dispatch = useAppDispatch();
	const position = useAppSelector((state) => {
		return state.game.gameState.position;
	});
	const [optionSquares, setOptionSquares] = useState({});

	useEffect(() => {
		socket.on("recieve_move", (move) => {
			console.log("received");
			try {
				chess.move(move);
				if (chess.isGameOver()) {
					gameOver = true;
					if (
						chess.isThreefoldRepetition() ||
						chess.isStalemate() ||
						chess.isInsufficientMaterial()
					) {
						result = "draw";
					}
					if (chess.isCheckmate()) {
						chess.turn() === "b" ? (result = "white") : (result = "black");
					}
				}
				dispatch(
					setGameState({
						position: chess.fen(),
						pgn: chess.pgn(),
						isGameOver: gameOver,
						result: result,
					})
				);
			} catch (error) {}
		});
	}, [socket]);

	const handleDrop = (source: Square, target: Square, piece: Piece) => {
		setOptionSquares({});
		try {
			const move = chess.move({ from: source, to: target });
			if (chess.isGameOver()) {
				gameOver = true;
				if (
					chess.isThreefoldRepetition() ||
					chess.isStalemate() ||
					chess.isInsufficientMaterial()
				) {
					result = "draw";
				}
				if (chess.isCheckmate()) {
					chess.turn() === "b" ? (result = "white") : (result = "black");
				}
			}
			dispatch(
				setGameState({
					position: chess.fen(),
					pgn: chess.pgn(),
					isGameOver: gameOver,
					result: result,
				})
			);
			console.log(move);
			sendMove(move);
			return true;
		} catch (e) {
			return false;
		}
	};
	const handleClick = (square: Square) => {
		try {
			const move = chess.move({ from: sourceSquare, to: square });
			setOptionSquares({});
			if (chess.isGameOver()) {
				gameOver = true;
				if (
					chess.isThreefoldRepetition() ||
					chess.isStalemate() ||
					chess.isInsufficientMaterial()
				) {
					result = "draw";
				}
				if (chess.isCheckmate()) {
					chess.turn() === "b" ? (result = "white") : (result = "black");
				}
			}
			dispatch(
				setGameState({
					position: chess.fen(),
					pgn: chess.pgn(),
					isGameOver: gameOver,
					result: result,
				})
			);
			sendMove(move);
			return true;
		} catch (e) {}
		sourceSquare = square;
		const moves = chess.moves({ square: square, verbose: true });
		if (moves.length === 0) {
			setOptionSquares({});
			return false;
		}
		let newSquares = {};
		moves.map((move) => {
			const key = move.to;
			chess.get(key)
				? (newSquares = {
						...newSquares,
						[key]: {
							background:
								"radial-gradient(closest-side, #97aef3 80%, transparent 40%)",
						},
				  })
				: (newSquares = {
						...newSquares,
						[key]: {
							background:
								"radial-gradient(closest-side, #97aef3 30%, transparent 40%)",
						},
				  });
		});
		setOptionSquares(newSquares);
	};

	return (
		<Chessboard
			position={position}
			onPieceDrop={handleDrop}
			boardWidth={boardWidth}
			onSquareClick={handleClick}
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
