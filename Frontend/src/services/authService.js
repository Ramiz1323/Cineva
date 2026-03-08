import axiosClient from "../api/axiosClient";

export const signup = async (data) => {

  const res = await axiosClient.post("/auth/signup", data);

  return res.data;
};

export const login = async (data) => {

  const res = await axiosClient.post("/auth/login", data);

  return res.data;
};

export const logout = async () => {

  const res = await axiosClient.post("/auth/logout");

  return res.data;
};

export const authCheck = async () => {
  const res = await axiosClient.get("/auth/authCheck");
  return res.data;
};