import apiClient from "../services/apiClient";

export const createGroup = async (groupData) => {
  return await apiClient.post("/groups/create", groupData);
};

export const getUserGroups = async () => {
  return await apiClient.get("/groups");
};

export const updateGroupName = async (groupId, name) => {
  return await apiClient.put(`/groups/${groupId}/name`, { name });
};

export const addMemberToGroup = async (groupId, userId) => {
  return await apiClient.post(`/groups/${groupId}/members`, { userId });
};

export const removeMemberFromGroup = async (groupId, userId) => {
  return await apiClient.delete(`/groups/${groupId}/members/${userId}`);
};

export const getGroupMessages = async (groupId) => {
  return await apiClient.get(`/groups/${groupId}/messages`);
};

export const sendGroupMessage = async (groupId, content) => {
  return await apiClient.post(`/groups/${groupId}/messages`, { content });
};
