import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCast, getMovieImages } from "../services/movieService";

export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // movie data is required — fail hard if it breaks
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        // cast and images are optional — don't crash if they fail (admin movies)
        const [castResult, imagesResult] = await Promise.allSettled([
          getMovieCast(id),
          getMovieImages(id),
        ]);

        setCast(castResult.status === "fulfilled" ? castResult.value?.cast || [] : []);
        setImages(imagesResult.status === "fulfilled" ? imagesResult.value || null : null);
      } catch (err) {
        console.error(err);
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  return { movie, cast, images, loading, error };
};

