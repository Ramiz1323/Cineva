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