import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    watchHistory: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set initial data after login
        setUserData: (state, action) => {
            state.favorites = action.payload.favorites || [];
            state.watchHistory = action.payload.watchHistory || [];
        },
        
        // Favorites Logic
        toggleFavoriteSuccess: (state, action) => {
            state.favorites = action.payload; // Payload is the updated array from backend
        },
        
        // Watch History Logic
        updateHistorySuccess: (state, action) => {
            state.watchHistory = action.payload; // Payload is updated history array
        },
        
        // Status Handlers
        setUserLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
        
        // Clear data on logout
        clearUserData: (state) => {
            state.favorites = [];
            state.watchHistory = [];
            state.error = null;
        }
    },
});

export const { 
    setUserData, 
    toggleFavoriteSuccess, 
    updateHistorySuccess, 
    setUserLoading, 
    setUserError,
    clearUserData 
} = userSlice.actions;

export default userSlice.reducer;