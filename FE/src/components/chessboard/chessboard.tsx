import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Square,Piece,BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { useAppDispatch,useAppSelector } from '../../app-state/hooks';
import { makeMove } from '../../app-state/features/gameSlice';


const boardWidth = window.innerHeight*80*75/10000;

export const StandardBoard = (props:any)=>{
    
    const dispatch = useAppDispatch();
    const position = useAppSelector((state)=>{
        return state.game.gameState.position
    })
    const validity = useAppSelector((state)=>{
        return state.game.gameState.isMoveValid
    })

    const handleDrop = (source:Square,target:Square,piece:Piece)=>{
        dispatch(makeMove({from:source,to:target}))
        return validity
    }
    const handleClick = (square:Square)=>{
        console.log(square)
    }

    return(
        <Chessboard
            position={position}
            onPieceDrop={handleDrop}
            boardWidth={boardWidth}
            onSquareClick={handleClick}
            customDarkSquareStyle={{backgroundColor:'#B7C0D8'}}
            customLightSquareStyle={{backgroundColor:'#E8EDF9'}}
        />
    )
} 
