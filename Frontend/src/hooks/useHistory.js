import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../services/userService";
import { setHistory, userRequestStart, userRequestFailure } from "../redux/userSlice";

export const useHistory = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        dispatch(userRequestStart());
        
        const data = await getHistory();

        // handle both possible backend formats
        let fetchedHistory = [];
        if (Array.isArray(data)) {
          fetchedHistory = data;
        } else if (data && Array.isArray(data.history)) {
          fetchedHistory = data.history;
        }

        dispatch(setHistory(fetchedHistory));
      } catch (error) {
        console.error("History fetch failed:", error);
        dispatch(userRequestFailure(error.message || "Failed to fetch history"));
      }
    };

    fetchHistory();
  }, [dispatch]);

  return { history, loading };
};