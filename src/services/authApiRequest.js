import axios from "axios";
import { getToken } from "./storageService";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
});

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  // Get the authentication token from storage
  const token = await getToken("auth-token");

  // If a token exists, add it to the request headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return the modified config
  return config;
});

// Export the configured api instance
export default api;
