import React, { useState, useEffect } from "react";
import * as authApi from "../api/auth";
import { getToken, setToken, removeToken } from "../services/authService";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error("Failed to get user profile:", err);
          removeToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await authApi.logout();
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
