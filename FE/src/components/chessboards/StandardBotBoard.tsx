import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Square,Piece,BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { useAppDispatch,useAppSelector } from '../../app-state/hooks';
import { setGameState } from '../../app-state/features/gameSlice';
import {Chess} from 'chess.js'
import { useState } from 'react';
import Engine from '../../Engine';

const engine = new Engine();
const chess = new Chess();
let gameOver = false;
let result = ''
let sourceSquare = '';
let targetSquare='';


const boardWidth = window.innerHeight*80*75/10000;

const StandardBotBoard = (props:any)=>{
    const dispatch = useAppDispatch();
    const position = useAppSelector((state)=>{
        return state.game.gameState.position
    })
    const [optionSquares,setOptionSquares]=useState({})

    function findBestMove() {
        engine.evaluatePosition(chess.fen(), props.depth);
    
        engine.onMessage(({ bestMove }) => {
        if (bestMove) {
            try{
                chess.move(bestMove);
                if(chess.isGameOver()){
                    gameOver = true;
                    if(chess.isThreefoldRepetition() || chess.isStalemate() || chess.isInsufficientMaterial()){
                        result='draw';
                    }
                    if(chess.isCheckmate()){
                        chess.turn()==='b'? result='white' : result='black';
                    }
                }
                dispatch(setGameState({
                    position:chess.fen(),
                    pgn: chess.pgn(),
                    isGameOver: gameOver,
                    result: result
                }))
                return true;
            }catch(e){ 
                return false;
            }
        }
        });
    }

    const handleDrop = (source:Square,target:Square,piece:Piece)=>{
        setOptionSquares({})
        try{
            chess.move({from:source,to: target});
            if(chess.isGameOver()){
                gameOver = true;
                if(chess.isThreefoldRepetition() || chess.isStalemate() || chess.isInsufficientMaterial()){
                    result='draw';
                }
                if(chess.isCheckmate()){
                    chess.turn()==='b'? result='white' : result='black';
                }
            }
            dispatch(setGameState({
                position:chess.fen(),
                pgn: chess.pgn(),
                isGameOver: gameOver,
                result: result
            }))
            setTimeout(() => {
                findBestMove();
            }, 1000);
            return true;
        }catch(e){ 
            return false;
        }
    }
    const handleClick = (square:Square)=>{
        try{
            chess.move({from:sourceSquare,to: square});
            setOptionSquares({})
            if(chess.isGameOver()){
                gameOver = true;
                if(chess.isThreefoldRepetition() || chess.isStalemate() || chess.isInsufficientMaterial()){
                    result='draw';
                }
                if(chess.isCheckmate()){
                    chess.turn()==='b'? result='white' : result='black';
                }
            }
            dispatch(setGameState({
                position:chess.fen(),
                pgn: chess.pgn(),
                isGameOver: gameOver,
                result: result
            }))
            setTimeout(() => {
                findBestMove();
            }, 1000);
            return true;
        }catch(e){ 
        }
        sourceSquare=square;
        const moves = chess.moves({square:square,verbose:true});
        if (moves.length===0){setOptionSquares({}); return false}
        let newSquares = {};
        moves.map((move)=>{
            const key = move.to
            chess.get(key) ? 
            newSquares = {...newSquares, [key]:{background:"radial-gradient(closest-side, #97aef3 80%, transparent 40%)"}} : 
            newSquares = {...newSquares, [key]:{background:"radial-gradient(closest-side, #97aef3 30%, transparent 40%)"}}
        })
        setOptionSquares(newSquares)
    }

    return(
        <Chessboard
            position={position}
            onPieceDrop={handleDrop}
            boardWidth={boardWidth}
            onSquareClick={handleClick}
            customDarkSquareStyle={{backgroundColor:'#B7C0D8'}}
            customLightSquareStyle={{backgroundColor:'#E8EDF9'}}
            customSquareStyles={{...optionSquares}}
            animationDuration={100}
            arePremovesAllowed={true}
        />
    )
} 

export default StandardBotBoard;