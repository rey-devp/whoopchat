import apiClient from "../services/apiClient";

export const getUserProfile = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, userData) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await apiClient.get("/users/search", {
    params: { q: query },
  });
  return response.data;
};
