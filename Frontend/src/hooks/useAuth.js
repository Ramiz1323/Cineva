import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../redux/authSlice';
import { loginAPI, signupAPI, logoutAPI } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogin = async (credentials) => {
        dispatch(loginStart());
        try {
            const response = await loginAPI(credentials);
            dispatch(loginSuccess(response.data.user));
            navigate('/');
        } catch (err) {
            dispatch(loginFailure(err.response?.data?.message || "Login failed"));
        }
    };

    const handleSignup = async (userData) => {
        dispatch(loginStart());
        try {
            await signupAPI(userData);
            navigate('/login');
        } catch (err) {
            dispatch(loginFailure(err.response?.data?.message || "Signup failed"));
        }
    };

    return { user, loading, error, isAuthenticated, handleLogin, handleSignup };
};