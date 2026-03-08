import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../services/movieService";

// ─── Thunks ────────────────────────────────────────────────────────────────

// cache guard: skip the fetch if we already have data (prevents re-fetch on remount)
export const fetchTrending = createAsyncThunk(
  "movies/fetchTrending",
  async (_, { getState, rejectWithValue }) => {
    const { trending } = getState().movies;
    if (trending.length > 0) return null; // already cached
    try {
      const data = await getTrendingMovies();
      return data.results || data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPopular = createAsyncThunk(
  "movies/fetchPopular",
  async (_, { getState, rejectWithValue }) => {
    const { popular } = getState().movies;
    if (popular.length > 0) return null;
    try {
      const data = await getPopularMovies();
      return data.results || data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTopRated = createAsyncThunk(
  "movies/fetchTopRated",
  async (_, { getState, rejectWithValue }) => {
    const { topRated } = getState().movies;
    if (topRated.length > 0) return null;
    try {
      const data = await getTopRatedMovies();
      return data.results || data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async (_, { getState, rejectWithValue }) => {
    const { upcoming } = getState().movies;
    if (upcoming.length > 0) return null;
    try {
      const data = await getUpcomingMovies();
      return data.results || data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieCache: (state) => {
      state.trending = [];
      state.popular = [];
      state.topRated = [];
      state.upcoming = [];
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => { state.loading = true; state.error = null; };
    const handleRejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchTrending.pending, handlePending)
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.trending = action.payload; // null = cache hit, skip
      })
      .addCase(fetchTrending.rejected, handleRejected)

      .addCase(fetchPopular.pending, handlePending)
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.popular = action.payload;
      })
      .addCase(fetchPopular.rejected, handleRejected)

      .addCase(fetchTopRated.pending, handlePending)
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.topRated = action.payload;
      })
      .addCase(fetchTopRated.rejected, handleRejected)

      .addCase(fetchUpcoming.pending, handlePending)
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.upcoming = action.payload;
      })
      .addCase(fetchUpcoming.rejected, handleRejected);
  },
});

export const { clearMovieCache } = moviesSlice.actions;
export default moviesSlice.reducer;

// ─── Memoized Selectors ────────────────────────────────────────────────────

const selectMoviesState = (state) => state.movies;

export const selectTrending = createSelector(selectMoviesState, (m) => m.trending);
export const selectPopular = createSelector(selectMoviesState, (m) => m.popular);
export const selectTopRated = createSelector(selectMoviesState, (m) => m.topRated);
export const selectUpcoming = createSelector(selectMoviesState, (m) => m.upcoming);
export const selectMoviesLoading = createSelector(selectMoviesState, (m) => m.loading);
