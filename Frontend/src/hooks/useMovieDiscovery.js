import { useEffect, useState } from "react";
import { getTrendingMovies, getPopularMovies } from "../services/movieService";

export const useMovieDiscovery = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingData = await getTrendingMovies();
        const popularData = await getPopularMovies();

        setTrending(trendingData.results);
        setPopular(popularData.results);
      } catch (error) {
        console.error("Movie fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    trending,
    popular,
    loading,
  };
};
