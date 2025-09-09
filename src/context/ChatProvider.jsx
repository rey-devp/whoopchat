import React, { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { ChatContext } from "./chatContext";
import { removeToken } from "../services/authService";

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const ws = useWebSocket(); // sekarang langsung socket instance (bukan ref)

  // 📨 Handler pesan baru
  const handleNewMessage = useCallback(
    (message) => {
      if (message.chatId === activeChat?.id) {
        setMessages((prev) => [...prev, message]);
      }
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === message.chatId
            ? { ...chat, lastMessage: message.content }
            : chat
        )
      );
    },
    [activeChat?.id]
  );

  // ➕ Handler chat baru
  const handleChatCreated = useCallback((chat) => {
    setChats((prev) => [...prev, chat]);
  }, []);

  useEffect(() => {
    if (!ws) return;

    console.log("✅ WebSocket instance ready");

    ws.on("message", handleNewMessage);
    ws.on("chat_created", handleChatCreated);

    // 🔑 Handle kalau server nolak token
    ws.on("connect_error", (err) => {
      console.error("❌ WS connect_error:", err.message);
      if (err.message.includes("jwt") || err.message.includes("token")) {
        removeToken();
        window.location.href = "/login";
      }
    });

    ws.on("disconnect", (reason) => {
      console.warn("⚠️ WS disconnected:", reason);
    });

    return () => {
      ws.off("message", handleNewMessage);
      ws.off("chat_created", handleChatCreated);
      ws.off("connect_error");
      ws.off("disconnect");
    };
  }, [ws, handleNewMessage, handleChatCreated]);

  // 📤 Fungsi kirim pesan
  const sendMessage = useCallback(
    (content) => {
      if (activeChat && ws) {
        ws.emit("message", {
          chatId: activeChat.id,
          content,
        });
      } else {
        console.warn("⚠️ Cannot send message, no activeChat or WS not ready");
      }
    },
    [activeChat, ws]
  );

  const value = {
    activeChat,
    setActiveChat,
    messages,
    setMessages,
    chats,
    setChats,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
