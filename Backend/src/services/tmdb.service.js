const axios = require("axios");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const fetchTrending = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("TMDB ERROR:", error.message);
    throw new Error("TMDB request failed");
  }
};

const fetchPopular = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY },
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

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return response.data;
};

module.exports = {
  fetchTrending,
  fetchPopular,
  fetchMovieDetails,
  searchMovies,
};
