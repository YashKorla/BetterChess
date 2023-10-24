import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Square } from 'react-chessboard/dist/chessboard/types';

// interface move {
//     from:Square,
//     to:Square,
// }

interface game {
    isLoading: boolean;
    gameState:{
        opponent:{name:string,rating:number,color:string},
        position: string;
        pgn: string;
        isBlackTimerRunning: boolean,
        isWhiteTimerRunning: boolean,
        isGameOver: boolean,
        result:string,
    }
}
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ';
const initialState:game = {
    isLoading: false,
    gameState:{
        opponent:{
            name:'',
            rating:400,
            color:'',
        },
        position: startPosition,
        pgn: '',
        isBlackTimerRunning: false,
        isWhiteTimerRunning: true,
        isGameOver: false,
        result: 'draw' //If winner exists then color else draw,  example 'white'
  }
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameState(state, action: PayloadAction<any>){
            state.gameState.position=action.payload.position;
            state.gameState.pgn=action.payload.pgn;
            state.gameState.result=action.payload.result;
            state.gameState.isGameOver=action.payload.isGameOver;

            if(action.payload.isGameOver){
                state.gameState.isBlackTimerRunning=false;
                state.gameState.isWhiteTimerRunning=false;
            }
            else{
                state.gameState.isBlackTimerRunning=!state.gameState.isBlackTimerRunning;
                state.gameState.isWhiteTimerRunning=!state.gameState.isWhiteTimerRunning;
            }
        },
        setWinner(state, action: PayloadAction<string>){
            state.gameState.result=action.payload
            state.gameState.isGameOver=true;
        },
        closeModal(state){
            state.gameState.isGameOver=false;
        },
        resetState(state){
            state=initialState;
        }
    }
})

export const { setGameState,setWinner,closeModal } = gameSlice.actions;

export default gameSlice.reducer;
