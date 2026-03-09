import axiosClient from "../api/axiosClient";

export const toggleFavorite = async (movie) => {

  const res = await axiosClient.post("/user/favorite", movie);

  return res.data;
};

export const getFavorites = async () => {

  const res = await axiosClient.get("/user/favorites");

  return res.data;

};

export const addToHistory = async (movie) => {

  const res = await axiosClient.post("/user/history", movie);

  return res.data;
};

export const getHistory = async () => {
  const res = await axiosClient.get("/user/history");
  return res.data;
};

export const toggleWatchlist = async (movie) => {
  const res = await axiosClient.post("/user/watchlist", movie);
  return res.data;
};

export const getWatchlist = async () => {
  const res = await axiosClient.get("/user/watchlist");
  return res.data;
};