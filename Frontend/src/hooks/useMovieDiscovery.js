import { useState, useEffect } from "react";
import { fetchMovies } from "../services/tmdbService";

export const useMovieDiscovery = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [trendingData, popularData] = await Promise.all([
          fetchMovies("trending"),
          fetchMovies("popular"),
        ]);
        setTrending(trendingData.results);
        setPopular(popularData.results);
      } catch (error) {
        console.error("Discovery Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { trending, popular, loading };
};