import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatList from "../components/ChatList";
import { useChat } from "../context/useChat";
import * as chatApi from "../api/chat";
import toast from "react-hot-toast";

const ChatRoom = () => {
  const { id } = useParams();
  const {
    activeChat,
    setActiveChat,
    messages,
    setMessages,
    sendMessage,
    chats,
  } = useChat();

  useEffect(() => {
    const loadChat = async () => {
      try {
        const chatMessages = await chatApi.getMessages(id);
        setMessages(chatMessages);

        if (!activeChat || activeChat.id !== id) {
          const currentChat = chats.find((chat) => chat.id === id);
          setActiveChat(currentChat);
        }
      } catch (error) {
        console.error("Error loading chat:", error);
      }
    };

    loadChat();
  }, [id, activeChat, chats, setActiveChat, setMessages]);

  const handleSendMessage = (content) => {
    try {
      sendMessage(content);
      toast.success("Message sent!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-96">
        <ChatList chats={chats} onChatSelect={setActiveChat} />
      </div>
      <div className="flex-1">
        <ChatWindow
          chat={activeChat}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
