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
  searchMovies,
};
