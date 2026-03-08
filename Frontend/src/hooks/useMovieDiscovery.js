import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending, fetchPopular } from "../redux/movieSlice";
import { selectTrending, selectPopular, selectMoviesLoading } from "../redux/movieSlice";

export const useMovieDiscovery = () => {
  const dispatch = useDispatch();
  const trending = useSelector(selectTrending);
  const popular = useSelector(selectPopular);
  const loading = useSelector(selectMoviesLoading);

  useEffect(() => {
    // thunks have built-in cache guard — won't re-fetch if data already in store
    dispatch(fetchTrending());
    dispatch(fetchPopular());
  }, [dispatch]);

  return { trending, popular, loading };
};
