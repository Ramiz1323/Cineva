import axiosClient from "../api/axiosClient";

export const getTrendingMovies = async () => {
  const res = await axiosClient.get("/movie/trending");

  return res.data;
};

export const getPopularMovies = async () => {
  const res = await axiosClient.get("/movie/popular");

  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await axiosClient.get(`/movie/${id}`);

  return res.data;
};

export const searchMovies = async (query) => {

  const res = await axiosClient.get("/movie/search", {
    params: { q: query }
  });

  return res.data.results;

};
