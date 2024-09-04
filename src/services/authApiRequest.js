import axios from "axios";
import { getToken } from "./storageService";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken("auth-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
