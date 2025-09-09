import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getToken, isValidToken, removeToken } from "../services/authService";

export const useWebSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    const token = getToken();
    if (!token || !isValidToken(token)) {
      removeToken();
      console.warn("Invalid or expired token, skipping WebSocket connect");
      return;
    }

    if (!socket.current) {
      socket.current = io(import.meta.env.VITE_WS_URL, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.current.on("connect", () => {
        console.log("✅ Connected to WebSocket server");
      });

      socket.current.on("disconnect", () => {
        console.log("⚠️ Disconnected from WebSocket server");
      });

      socket.current.on("connect_error", (err) => {
        console.error("❌ WebSocket connect error:", err.message);
        if (err.message.includes("jwt") || err.message.includes("token")) {
          removeToken();
          window.location.href = "/login";
        }
      });

      socket.current.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  return socket.current; // ✅ ini kuncinya
};
