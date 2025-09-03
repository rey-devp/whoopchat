import apiClient from "../services/apiClient";

export const getMessages = async (chatId) => {
  return await apiClient.get(`/chats/${chatId}/messages`);
};

export const sendMessage = async (chatId, content) => {
  return await apiClient.post(`/chats/${chatId}/messages`, { content });
};

export const startChat = async (userId) => {
  return await apiClient.post("/chats/start", { userId });
};

export const getChatList = async () => {
  return await apiClient.get("/chats");
};
