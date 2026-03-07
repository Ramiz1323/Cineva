import { useDispatch, useSelector } from 'react-redux';
import { updateHistorySuccess, setUserError } from '../redux/userSlice';
import { addToHistoryAPI } from '../api/user.api';

export const useUser = () => {
    const dispatch = useDispatch();
    const { favorites, watchHistory } = useSelector((state) => state.user);

    const saveToHistory = async (movieData) => {
        try {
            const response = await addToHistoryAPI(movieData);
            dispatch(updateHistorySuccess(response.data.history));
        } catch (err) {
            dispatch(setUserError(err.response?.data?.message || "Failed to update history"));
        }
    };

    return { favorites, watchHistory, saveToHistory };
};