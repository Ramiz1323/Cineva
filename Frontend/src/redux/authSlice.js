import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authCheckStart: (state) => {
      state.isCheckingAuth = true;
    },
    authCheckSuccess: (state, action) => {
      state.isCheckingAuth = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authCheckFailure: (state) => {
      state.isCheckingAuth = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  authCheckStart,
  authCheckSuccess,
  authCheckFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  signupSuccess,
  logout,
  resetError,
  updateUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;

// ─── Memoized Selectors ────────────────────────────────────────────────────

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(selectAuthState, (a) => a.user);
export const selectIsAuthenticated = createSelector(selectAuthState, (a) => a.isAuthenticated);
export const selectIsCheckingAuth = createSelector(selectAuthState, (a) => a.isCheckingAuth);
export const selectAuthLoading = createSelector(selectAuthState, (a) => a.loading);
export const selectAuthError = createSelector(selectAuthState, (a) => a.error);
export const selectIsAdmin = createSelector(selectUser, (u) => u?.role === "admin");