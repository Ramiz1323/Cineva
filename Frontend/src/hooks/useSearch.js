import { useState, useEffect } from "react";
import { searchMovies } from "../services/movieService";
import { useDebounce } from "./useDebounce";

export const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        const data = await searchMovies(debouncedQuery);

        setResults(data);
      } catch (error) {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return { results, loading };
};
