import React from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import { useChat } from "../context/useChat";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar / Chat List */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-96 border-r border-gray-700 bg-white/5 backdrop-blur-md"
      >
        <ChatList chats={chats} onChatSelect={handleChatSelect} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-10 shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-2">Welcome to WhoopChat 👋</h2>
          <p className="text-gray-300">Select a chat to start messaging</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
