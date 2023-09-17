import React, { useEffect } from 'react';
import {Chess} from 'chess.ts';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';
import { Square,Piece,BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { useTimer } from 'react-timer-hook';
import { Avatar, Box, Typography, styled,useTheme } from '@mui/material';
import { ternaryOperator } from '../../utils';
import Timer from '../../utilities/Timer';

const chess = new Chess();

export const StandardBoard = (props:any)=>{
    const theme = useTheme();
    const [position,setPosition] = useState(chess.fen());
    const [orientation,setOrientation] = useState<BoardOrientation>("white");
    const {expiryTimestamp,opponent,opponentRating,color} = props;
    const [blackTimerState,setBlackTimerState]=useState("pause");
    const [whiteTimerState,setWhiteTimerState]=useState("");
    const boardWidth = window.innerHeight*80*75/10000;
    console.log(boardWidth);

    const StyledBox=styled(Box)({
        width:'80vh',
        height:'80vh', 
        display: 'flex',
        flexDirection:'column',    
    })

    const handleDrop = (source:Square,target:Square,piece:Piece)=>{
        try {
            const turn = chess.turn();
            chess.move({from:source,to:target});
            setPosition(chess.fen());
            return true;
        } catch (error) {
            return false;
        }
    }
    const handleClick = (square:Square)=>{
        console.log(square)
    }

    return(
        <StyledBox id='box'>
            <Timer
                name={opponent}
                rating={opponentRating}
                expiryTimestamp={expiryTimestamp}
                timerState={ternaryOperator(color==='white',blackTimerState,whiteTimerState)}
            />
            <Chessboard
                position={position}
                onPieceDrop={handleDrop}
                boardWidth={boardWidth}
                boardOrientation={orientation}
                onSquareClick={handleClick}
                customDarkSquareStyle={{backgroundColor:'#B7C0D8'}}
                customLightSquareStyle={{backgroundColor:'#E8EDF9'}}
            />
            <Timer
                name='userName'
                rating='Rating'
                expiryTimestamp={expiryTimestamp}
                timerState={ternaryOperator(color==='black',blackTimerState,whiteTimerState)}
            />
        </StyledBox>
    )
} 
