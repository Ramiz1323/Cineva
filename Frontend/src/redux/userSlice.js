import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  history: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {

    userRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    setFavorites: (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    },

    toggleFavoriteSuccess: (state, action) => {
      state.loading = false;

      const movie = action.payload;

      const exists = state.favorites.find(m => m.movieId === movie.movieId);

      if (exists) {
        state.favorites = state.favorites.filter(
          m => m.movieId !== movie.movieId
        );
      } else {
        state.favorites.push(movie);
      }
    },

    setHistory: (state, action) => {
      state.loading = false;
      state.history = action.payload;
    },

    addHistorySuccess: (state, action) => {
      state.loading = false;
      state.history.unshift(action.payload);
    },

    userRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearUserData: (state) => {
      state.favorites = [];
      state.history = [];
      state.loading = false;
      state.error = null;
    }

  }
});

export const {
  userRequestStart,
  setFavorites,
  toggleFavoriteSuccess,
  setHistory,
  addHistorySuccess,
  userRequestFailure,
  clearUserData
} = userSlice.actions;

export default userSlice.reducer;