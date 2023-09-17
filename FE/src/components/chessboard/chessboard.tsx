import React, { useEffect } from 'react';
import {Chess} from 'chess.ts';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';
import { Square,Piece,BoardOrientation } from 'react-chessboard/dist/chessboard/types';

const chess = new Chess();

const timer = ()=>{
    return(
        <></>
    )
}

export const StandardBoard = ()=>{
    const [position,setPosition] = useState(chess.fen());
    const [orientation,setOrientation] = useState<BoardOrientation>("white");

    const handleDrop = (source:Square,target:Square,piece:Piece)=>{
        try {
            chess.move({from:source,to:target});
            console.warn(chess.fen());
            setPosition(chess.fen());
            console.error(chess.getComment());
            // setOrientation((prevState: BoardOrientation)=>{
            //     return prevState === "white" ? "black" : "white";
            // });
            return true;
        } catch (error) {
            return false;
        }
    }
    const handleClick = (square:Square)=>{
        console.log(square)
    }

    return(
        <>
        <Chessboard
            position={position}
            onPieceDrop={handleDrop}
            boardWidth={500}
            boardOrientation={orientation}
            onSquareClick={handleClick}
        />
        </>
    )
} 
