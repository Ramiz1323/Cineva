import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../redux/authSlice";

import { login, signup, logout } from "../services/authService";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const handleLogin = async (credentials) => {
    dispatch(loginStart());

    try {
      const data = await login(credentials);

      dispatch(loginSuccess(data.user));

      navigate("/");

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      dispatch(loginFailure(message));

      return { success: false };
    }
  };

  const handleSignup = async (userData) => {
    dispatch(loginStart());

    try {
      await signup(userData);

      navigate("/login");

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";

      dispatch(loginFailure(message));

      return { success: false };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutAction());

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    handleLogin,
    handleSignup,
    handleLogout,
  };
};
