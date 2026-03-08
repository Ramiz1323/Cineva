import axios from "axios";

const publicAxiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // Omitting 'withCredentials: true' to prevent strict browsers (like Incognito)
  // from blocking cross-origin public data requests before the user interacts/logs in.
});

export default publicAxiosClient;
