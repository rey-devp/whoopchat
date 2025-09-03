import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getToken } from "../services/authService";

export const useWebSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    const token = getToken();
    if (token && !socket.current) {
      try {
        socket.current = io(import.meta.env.VITE_WS_URL, {
          auth: {
            token,
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });
      } catch (err) {
        console.error("Failed to connect to WebSocket:", err);
        return null;
      }

      socket.current.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.current.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
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

  return socket.current;
};
