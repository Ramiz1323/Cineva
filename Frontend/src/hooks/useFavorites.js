import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavorites } from "../redux/userSlice";
import { selectFavorites, selectUserLoading } from "../redux/userSlice";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return { favorites, loading };
};
