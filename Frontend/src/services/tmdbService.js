import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY,
    },
});

export const fetchMovies = async (category, page = 1) => {
    try {
        const endpoints = {
            trending: '/trending/movie/day',
            popular: '/movie/popular',
            topRated: '/movie/top_rated',
            upcoming: '/movie/upcoming',
            nowPlaying: '/movie/now_playing',
        };

        const response = await tmdbApi.get(endpoints[category] || endpoints.trending, {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error("TMDB Fetch Error:", error);
        return { results: [], total_pages: 0 }; // return empty structure to prevent errors in UI
    }
};

export const searchMovies = async (query, page = 1) => {
    if (!query) return { results: [] };
    try {
        const response = await tmdbApi.get('/search/multi', {
            params: { query, page },
        });
        return response.data;
    } catch (error) {
        console.error("TMDB Search Error:", error);
        return { results: [] };
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await tmdbApi.get(`/movie/${id}`, {
            params: { append_to_response: 'videos' },
        });
        return response.data;
    } catch (error) {
        console.error("Details Fetch Error:", error);
        return null;
    }
};