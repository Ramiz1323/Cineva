import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/tmdbService';
import { useUser } from './useUser'; // Import our new hook

export const useMovieDetails = (id) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { saveToHistory } = useUser();

    useEffect(() => {
        const getDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);

            if (data) {
                await saveToHistory({
                    movieId: data.id,
                    title: data.title,
                    posterPath: data.poster_path,
                });
            }
            setLoading(false);
        };
        if (id) getDetails();
    }, [id]);

    return { movie, loading };
};