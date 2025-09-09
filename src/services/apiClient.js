import axios from "axios";
import { getToken, isValidToken, removeToken } from "./authService";

const BASE_URL = "http://localhost:8080";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request → tambahin token kalau valid
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token && isValidToken(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token && !isValidToken(token)) {
    // Token expired → clear
    console.warn("⏰ Token expired, removing...");
    removeToken();
  }

  return config;
});

// Interceptor response → handle error global
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized → clear token & redirect
      console.error("❌ Unauthorized, redirecting to login...");
      removeToken();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
