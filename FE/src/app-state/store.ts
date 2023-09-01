import { configureStore } from '@reduxjs/toolkit';
import userPreferencefReducer from './features/userPreferenceSlice'

export const store = configureStore({
  reducer: {
    userPreference: userPreferencefReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;