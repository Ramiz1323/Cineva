const axios = require("axios");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const fetchTrending = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY, page },
    });
    return response.data;
  } catch (error) {
    console.error("TMDB ERROR:", error.message);
    throw new Error("TMDB request failed");
  }
};

const fetchPopular = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

const fetchTopRatedMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

const fetchUpcomingMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

// --- TV SHOWS ---

const fetchTrendingTv = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/trending/tv/day`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

const fetchPopularTv = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/tv/popular`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

const fetchTopRatedTv = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  });

  return response.data;
};

const fetchMovieCast = async (id) => {
  // get the actor list
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const fetchMovieImages = async (id) => {
  // get movie pictures and backgrounds 
  const response = await axios.get(`${BASE_URL}/movie/${id}/images`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const fetchMovieVideos = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
      page
    },
  });
  return response.data;
};

// Genre lists
const fetchMovieGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data; // { genres: [{id, name}] }
};

const fetchTvGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const fetchTvVideos = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

// Discover (genre filter + sort)
const discoverMovies = async (page = 1, genreId = null, sortBy = 'popularity.desc') => {
  const params = { api_key: API_KEY, page, sort_by: sortBy };
  if (genreId) params.with_genres = genreId;
  const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
  return response.data;
};

const discoverTv = async (page = 1, genreId = null, sortBy = 'popularity.desc') => {
  const params = { api_key: API_KEY, page, sort_by: sortBy };
  if (genreId) params.with_genres = genreId;
  const response = await axios.get(`${BASE_URL}/discover/tv`, { params });
  return response.data;
};

module.exports = {
  fetchTrending,
  fetchPopular,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchTrendingTv,
  fetchPopularTv,
  fetchTopRatedTv,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieImages,
  fetchMovieVideos,
  fetchTvVideos,
  searchMovies,
  fetchMovieGenres,
  fetchTvGenres,
  discoverMovies,
  discoverTv,
};
