import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getFavorites, getHistory } from "../services/userService";
import { getMovieDetails } from "../services/movieService";

// ─── Thunks ────────────────────────────────────────────────────────────────

export const loadFavorites = createAsyncThunk(
  "user/loadFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavorites();
      const uniqueIds = [...new Set(data.favorites || [])];
      const movies = await Promise.all(uniqueIds.map((id) => getMovieDetails(id)));
      return movies;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loadHistory = createAsyncThunk(
  "user/loadHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getHistory();
      const raw = Array.isArray(data) ? data : (data?.history || []);
      // deduplicate
      const seen = new Set();
      return raw.filter((item) => {
        const key = String(item.movieId);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: "user",
  initialState: {
    favorites: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavoriteSuccess: (state, action) => {
      const movie = action.payload;
      const idx = state.favorites.findIndex((m) => m.movieId === movie.movieId);
      if (idx !== -1) {
        state.favorites.splice(idx, 1);
      } else {
        state.favorites.push(movie);
      }
    },
    addHistorySuccess: (state, action) => {
      // deduplicate & put newest first
      state.history = state.history.filter(
        (m) => String(m.movieId) !== String(action.payload.movieId)
      );
      state.history.unshift(action.payload);
    },
    clearUserData: (state) => {
      state.favorites = [];
      state.history = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // favorites
      .addCase(loadFavorites.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // history
      .addCase(loadHistory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(loadHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavoriteSuccess, addHistorySuccess, clearUserData } = userSlice.actions;
export default userSlice.reducer;

// ─── Memoized Selectors ────────────────────────────────────────────────────

const selectUserState = (state) => state.user;

export const selectFavorites = createSelector(selectUserState, (u) => u.favorites);
export const selectHistory = createSelector(selectUserState, (u) => u.history);
export const selectUserLoading = createSelector(selectUserState, (u) => u.loading);
export const selectFavoriteIds = createSelector(
  selectFavorites,
  (favs) => new Set(favs.map((f) => String(f.movieId)))
);