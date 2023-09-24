import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import { Square } from 'react-chessboard/dist/chessboard/types';
import { andOperator, ternaryOperator } from "../../utils";

const chess = new Chess();

interface move {
    from:Square,
    to:Square,
}

interface game {
    isLoading: boolean;
    gameState:{
        opponent:{name:string,rating:number,color:string},
        isMoveValid: boolean;
        position: string;
        pgn: string;
        isBlackTimerRunning: boolean,
        isWhiteTimerRunning: boolean,
        isInCheck: boolean;
        isGameOver: boolean,
        result:string,
    }
}
const initialState:game = {
  isLoading: false,
  gameState:{
    opponent:{
        name:'',
        rating:400,
        color:'',
    },
    isMoveValid: false,
    position: chess.fen(),
    pgn: chess.pgn(),
    isBlackTimerRunning: false,
    isWhiteTimerRunning: true,
    isInCheck: false,
    isGameOver: false,
    result: 'draw' //If winner exists then color else draw,  example 'white'
  }
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<move>){
            try{
                chess.move({from:action.payload.from,to: action.payload.to});
                state.gameState.position=chess.fen();
                state.gameState.pgn=chess.pgn();
                state.gameState.isWhiteTimerRunning= !state.gameState.isWhiteTimerRunning;
                state.gameState.isBlackTimerRunning= !state.gameState.isBlackTimerRunning;
                state.gameState.isMoveValid=true;
                if(chess.isGameOver()){
                    state.gameState.isGameOver=true;
                    state.gameState.isWhiteTimerRunning=false;
                    state.gameState.isBlackTimerRunning=false;
                    if(chess.isThreefoldRepetition() || chess.isStalemate() || chess.isInsufficientMaterial()){
                        state.gameState.result='draw';
                    }
                    if(chess.isCheckmate()){
                        ternaryOperator(
                            chess.turn()==='b',
                            state.gameState.result='black',
                            state.gameState.result='white'
                        )
                    }
                }
            }catch(e){
                state.gameState.isMoveValid=false;
            }
        },
        setWinner(state, action: PayloadAction<string>){
            state.gameState.result=action.payload
        },
        closeModal(state,action: PayloadAction<string>){
            state.gameState.isGameOver=false;
        }
    }
})

export const { makeMove,setWinner } = gameSlice.actions;

export default gameSlice.reducer;
