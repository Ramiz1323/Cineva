import axios from "axios";

const publicAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  // Omitting 'withCredentials: true' to prevent strict browsers (like Incognito)
  // from blocking cross-origin public data requests before the user interacts/logs in.
});

export default publicAxiosClient;
