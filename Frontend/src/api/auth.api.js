import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const signupAPI = (userData) => api.post("/auth/signup", userData);
export const loginAPI = (userData) => api.post("/auth/login", userData);
export const logoutAPI = () => api.post("/auth/logout");
export const addToHistoryAPI = (historyData) => api.post('/user/history', historyData);