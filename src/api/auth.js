import apiClient from "../services/apiClient";

export const login = async (credentials) => {
  return await apiClient.post("/auth/login", credentials);
};

export const register = async (userData) => {
  return await apiClient.post("/auth/register", userData);
};

export const logout = () => {
  // Logout is handled client-side by removing the token
  return Promise.resolve();
};

export const getCurrentUser = async () => {
  return await apiClient.get("/users/me");
};

export const searchUsers = async (query) => {
  return await apiClient.get("/users/search", {
    params: { q: query },
  });
};
