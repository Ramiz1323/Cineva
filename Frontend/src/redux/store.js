import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    movies: moviesReducer,
  },
});