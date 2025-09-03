import React from "react";

const ChatList = ({ chats, onChatSelect }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b"
          >
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="font-medium">{chat.name}</h3>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
