import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js';
import { BoardOrientation, Piece, Square } from 'react-chessboard/dist/chessboard/types';
import { Box, Typography, styled, useTheme } from '@mui/material';

const chess = new Chess();
const height = (window.innerHeight-120)*80/100;
let sourceSquare = '';

const PassAndPlay = () => {

    const [position,setPosition] = useState(chess.fen());
    const [optionSquares,setOptionSquares] = useState({})
    const [pgn,setPgn] = useState(chess.pgn());
    const [orientation,setOrientation] = useState<BoardOrientation>('white');

    const handleDrop = (source:Square,target: Square, piece:Piece) => {
        setOptionSquares({});
		try {
			chess.move({ from: source, to: target , promotion: piece[1].toLowerCase()});
            setPosition(chess.fen());
            chess.turn() === 'b' ? setOrientation('black') : setOrientation('white');
            setPgn(chess.pgn())
			return true;
		} catch (e) {
			return false;
		}
    }

    const handleClick = (square:Square) => {
        try {
			chess.move({ from: sourceSquare, to: square });
			setOptionSquares({});
		} catch (e) {}
		sourceSquare = square;
		const moves = chess.moves({ square: square, verbose: true });
		if (moves.length === 0) {
			setOptionSquares({});
			return false;
		}
		let newSquares = {};
		moves.forEach((move) => {
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
    }

    const GameControls = () => {
        const theme = useTheme()
        
        const OuterBox=styled(Box)({
            width:'415px',   
            height:`${height}px`,
            padding:'20px',
            backgroundColor:theme.palette.primary.dark,
            borderRadius:'10px',
        })  
        
        const InnerBox=styled(Box)({
            width:'100%',
            height: '100%',
            backgroundColor:theme.palette.primary.light,
            borderRadius:'10px',
            padding:'15px',
            overflow:'scroll',
        })
    
        return (
            <OuterBox>
                <InnerBox>
                    <Typography variant='subtitle2'>{pgn}</Typography>
                </InnerBox>
            </OuterBox>
        )
    }

    return (
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'center', height:'80vh'}}>
            <Box sx={{marginRight:'200px'}}>
                <Chessboard
                    position={position}
                    onPieceDrop={handleDrop}
                    boardWidth={height}
                    onSquareClick={handleClick}
                    customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
                    customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
                    customSquareStyles={{ ...optionSquares }}
                    animationDuration={100}
                    arePremovesAllowed={false}
                    boardOrientation={orientation}
                />
            </Box>
            <GameControls/>
        </Box>
    )
}

export default PassAndPlay