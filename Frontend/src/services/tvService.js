import publicAxiosClient from "../api/publicAxiosClient";

export const getTrendingTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/trending", {
    params: { page }
  });
  return res.data;
};

export const getPopularTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/popular", {
    params: { page }
  });
  return res.data;
};

export const getTopRatedTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/top-rated", {
    params: { page }
  });
  return res.data;
};

export const getTvGenres = async () => {
  const res = await publicAxiosClient.get("/tv/genres");
  return res.data.genres;
};

export const discoverTv = async (page = 1, genreId = null, sort = "popularity.desc") => {
  const params = { page, sort };
  if (genreId) params.genre = genreId;
  const res = await publicAxiosClient.get("/tv/discover", { params });
  return res.data;
};

export const getTvTrailers = async (id) => {
  const res = await publicAxiosClient.get(`/tv/${id}/trailers`);
  return res.data;
};
