import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHistory } from "../redux/userSlice";
import { selectHistory, selectUserLoading } from "../redux/userSlice";

export const useHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(loadHistory());
  }, [dispatch]);

  return { history, loading };
};