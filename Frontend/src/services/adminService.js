import axiosClient from "../api/axiosClient";

// --- MOVIES ---
export const adminGetMovies = async () => {
  const res = await axiosClient.get("/admin/movies");
  return res.data;
};

export const adminAddMovie = async (movieData) => {
  const res = await axiosClient.post("/admin/movies", movieData);
  return res.data;
};

export const adminUpdateMovie = async (id, movieData) => {
  const res = await axiosClient.put(`/admin/movies/${id}`, movieData);
  return res.data;
};

export const adminDeleteMovie = async (id) => {
  const res = await axiosClient.delete(`/admin/movies/${id}`);
  return res.data;
};

// --- USERS ---
export const adminGetUsers = async () => {
  const res = await axiosClient.get("/admin/users");
  return res.data;
};

export const adminBanUser = async (id) => {
  const res = await axiosClient.put(`/admin/users/${id}/ban`);
  return res.data;
};

export const adminDeleteUser = async (id) => {
  const res = await axiosClient.delete(`/admin/users/${id}`);
  return res.data;
};