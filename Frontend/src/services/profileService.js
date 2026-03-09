import axiosClient from "../api/axiosClient";

export const getProfile = async () => {
  const res = await axiosClient.get("/user/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axiosClient.put("/user/profile", data);
  return res.data;
};
