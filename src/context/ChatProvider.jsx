import React, { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { ChatContext } from "./chatContext";

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const ws = useWebSocket();

  const handleNewMessage = useCallback(
    (message) => {
      if (message.chatId === activeChat?.id) {
        setMessages((prev) => [...prev, message]);
      }
      // Update last message in chat list
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

  const handleChatCreated = useCallback((chat) => {
    setChats((prev) => [...prev, chat]);
  }, []);

  useEffect(() => {
    if (ws) {
      ws.on("message", handleNewMessage);
      ws.on("chat_created", handleChatCreated);
    }

    return () => {
      if (ws) {
        ws.off("message", handleNewMessage);
        ws.off("chat_created", handleChatCreated);
      }
    };
  }, [ws, handleNewMessage, handleChatCreated]);

  const sendMessage = useCallback(
    (content) => {
      if (activeChat && ws) {
        ws.emit("message", {
          chatId: activeChat.id,
          content,
        });
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
