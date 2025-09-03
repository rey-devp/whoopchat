import React from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import { useChat } from "../context/useChat";
import toast from "react-hot-toast";

const Home = () => {
  const { chats, setActiveChat } = useChat();
  const navigate = useNavigate();

  const handleChatSelect = (chat) => {
    try {
      setActiveChat(chat);
      toast.success(`Opening chat with ${chat.name}`);
      navigate(`/chat/${chat.id}`);
    } catch {
      toast.error("Failed to open chat");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-96">
        <ChatList chats={chats} onChatSelect={handleChatSelect} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-semibold mb-2">Welcome to WhoopChat</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
