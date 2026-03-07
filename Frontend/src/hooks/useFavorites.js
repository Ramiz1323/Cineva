import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../services/userService";
import { getMovieDetails } from "../services/movieService";
import { setFavorites } from "../redux/userSlice";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();

        const ids = data.favorites || [];

        const movies = await Promise.all(
          ids.map(async (id) => {
            const movie = await getMovieDetails(id);

            return movie;
          }),
        );

        dispatch(setFavorites(movies));
      } catch (error) {
        console.error("Favorites fetch failed:", error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  return { favorites };
};
