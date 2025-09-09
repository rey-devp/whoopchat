import React from "react";
import MessageInput from "./MessageInput";
import toast from "react-hot-toast";

const ChatWindow = ({ chat, messages, onSendMessage }) => {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-white/5 backdrop-blur-md">
        <h2 className="text-xl font-semibold">{chat?.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl shadow-md ${
                message.isMine
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-200"
              }`}
            >
              {message.content}
              <div
                className={`text-xs mt-1 ${
                  message.isMine ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-white/5 backdrop-blur-md">
        <MessageInput
          onSendMessage={(content) => {
            if (!content.trim()) {
              toast.error("Message cannot be empty");
              return;
            }
            onSendMessage(content);
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
