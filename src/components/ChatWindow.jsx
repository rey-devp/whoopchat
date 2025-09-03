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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">{chat?.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isMine
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.content}
              <div
                className={`text-xs mt-1 ${
                  message.isMine ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
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
