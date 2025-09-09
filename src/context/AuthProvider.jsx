import React, { useState, useEffect } from "react";
import * as authApi from "../api/auth";
import { getToken, setToken, removeToken } from "../services/authService";
import { AuthContext } from "./authContext";

// Helper buat decode JWT payload
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return {};
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          // kalau ada endpoint get profile
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

    const token = response?.data?.token; // ✅ backend kirim di data.token
    if (!token) throw new Error("Login failed: no token returned");

    setToken(token);

    // isi user minimal dari JWT payload
    const payload = parseJwt(token);
    setUser({ id: payload.user_id || null });

    return { token };
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);

    const token = response?.data?.token;
    if (!token) throw new Error("Register failed: no token returned");

    setToken(token);

    const payload = parseJwt(token);
    setUser({ id: payload.user_id || null });

    return { token };
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      console.warn("Logout API failed, but clearing local token anyway");
    }
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
