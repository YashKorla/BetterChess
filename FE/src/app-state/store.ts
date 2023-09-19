import { configureStore } from '@reduxjs/toolkit';
import userPreferencefReducer from './features/userPreferenceSlice'
import gameReducer from './features/gameSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    userPreference: userPreferencefReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;