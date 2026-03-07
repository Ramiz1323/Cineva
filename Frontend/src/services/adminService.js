import axiosClient from "../api/axiosClient";

export const addMovie = async (movie) => {

  const res = await axiosClient.post("/admin/add-movie", movie);

  return res.data;
};

export const getUsers = async () => {

  const res = await axiosClient.get("/admin/users");

  return res.data;
};

export const deleteMovie = async (id) => {

  const res = await axiosClient.delete(`/admin/movie/${id}`);

  return res.data;
};