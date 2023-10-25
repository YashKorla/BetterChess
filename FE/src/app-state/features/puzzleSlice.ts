import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Square } from 'react-chessboard/dist/chessboard/types';
import axios from "axios";

interface move {
    from:Square,
    to:Square,
}
interface puzzleReducer {
    isLoading: boolean;
    scoreCounter: number;
    puzzleCounter: number;
    toClose: boolean,
    puzzleState:{
        puzzles:puzzle[];
        trackPuzzles: {rating: number, solved: boolean}[];
    }
}
interface puzzleRating {
    puzzle_rating:{
        rating: number;
        start: boolean;
    }
}

interface puzzle {
    fen:string;
    moves: string;
    rating:number;
}
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ';

export const fetchOnePuzzle = createAsyncThunk('puzzle/fetchOnePuzzle', async (data:puzzleRating) => {
    data.puzzle_rating={...data.puzzle_rating,start: false};
    return axios
      .post('http://localhost:8080/puzzles/get-puzzle',data)
      .then((response) => response.data)
      .catch((err) => err.response.data)
});

export const fetchPuzzles = createAsyncThunk('puzzle/fetchPuzzles', async (data:puzzleRating) => {
data.puzzle_rating={...data.puzzle_rating,start: true};
return axios
    .post('http://localhost:8080/puzzles/get-puzzle',data)
    .then((response) => response.data)
    .catch((err) => err.response.data)
});

const initialState:puzzleReducer = {
    isLoading: false,
    scoreCounter:0,
    puzzleCounter:0,
    toClose: false,
    puzzleState:{
        puzzles:[],
        trackPuzzles:[],
    }
};

const puzzleSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateTrack(state, action){
            state.puzzleCounter = state.puzzleCounter+1;
            if(action.payload.solved===true){
                state.scoreCounter=state.scoreCounter+1;
            }
            state.puzzleState.trackPuzzles.push(action.payload)
        },
        closeScoreModal(state){
            state.toClose=false;
        },
        quitPuzzles(state){
            state.toClose= true;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchPuzzles.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(fetchPuzzles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.puzzleState.puzzles = state.puzzleState.puzzles.concat(action.payload);
          })
        .addCase(fetchPuzzles.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        })
        .addCase(fetchOnePuzzle.pending, (state) => {
            state.isLoading = false;
        })
        .addCase(fetchOnePuzzle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.puzzleState.puzzles.push(action.payload);
        })
        .addCase(fetchOnePuzzle.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        })
      }
})

export const {updateTrack, closeScoreModal, quitPuzzles } = puzzleSlice.actions;

export default puzzleSlice.reducer;