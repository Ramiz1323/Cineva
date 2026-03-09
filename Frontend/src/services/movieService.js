import axiosClient from "../api/axiosClient";
import publicAxiosClient from "../api/publicAxiosClient";

export const getTrendingMovies = async (page = 1) => {
  const res = await publicAxiosClient.get("/movie/trending", {
    params: { page }
  });
  return res.data;
};

export const getPopularMovies = async (page = 1) => {
  const res = await publicAxiosClient.get("/movie/popular", {
    params: { page }
  });
  return res.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const res = await publicAxiosClient.get("/movie/top-rated", {
    params: { page }
  });
  return res.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const res = await publicAxiosClient.get("/movie/upcoming", {
    params: { page }
  });
  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await publicAxiosClient.get(`/movie/${id}`);

  return res.data;
};

// get cast
export const getMovieCast = async (id) => {
  const res = await publicAxiosClient.get(`/movie/${id}/cast`);
  return res.data;
};

// get images
export const getMovieImages = async (id) => {
  const res = await publicAxiosClient.get(`/movie/${id}/images`);
  return res.data;
};

export const searchMovies = async (query, page = 1) => {
  const res = await publicAxiosClient.get("/movie/search", {
    params: { q: query, page }
  });
  return res.data.results;
};

export const getMovieGenres = async () => {
  const res = await publicAxiosClient.get("/movie/genres");
  return res.data.genres; // [{id, name}]
};

export const discoverMovies = async (page = 1, genreId = null, sort = 'popularity.desc') => {
  const params = { page, sort };
  if (genreId) params.genre = genreId;
  const res = await publicAxiosClient.get("/movie/discover", { params });
  return res.data;
};

export const getMovieTrailers = async (id) => {
  const res = await publicAxiosClient.get(`/movie/${id}/trailers`);
  return res.data;
};
