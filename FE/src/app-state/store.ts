import { configureStore } from '@reduxjs/toolkit';
import userPreferencefReducer from './features/userPreferenceSlice'
import gameReducer from './features/gameSlice'
import puzzleReducer from './features/puzzleSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    userPreference: userPreferencefReducer,
    puzzle: puzzleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;