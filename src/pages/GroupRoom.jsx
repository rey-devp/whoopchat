import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import * as groupApi from "../api/group";
import UserAvatar from "../components/UserAvatar";
import toast from "react-hot-toast";

const GroupRoom = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadGroup = async () => {
      const toastId = toast.loading("Loading group chat...");
      try {
        const [groupData, groupMessages] = await Promise.all([
          groupApi.getGroupDetails(id),
          groupApi.getGroupMessages(id),
        ]);

        setGroup(groupData);
        setMessages(groupMessages);
        setMembers(groupData.members);
        toast.success("Group chat loaded", { id: toastId });
      } catch (error) {
        console.error("Error loading group:", error);
        toast.error("Failed to load group chat", { id: toastId });
      }
    };

    loadGroup();
  }, [id]);

  const handleSendMessage = async (content) => {
    const toastId = toast.loading("Sending message...");
    try {
      const response = await groupApi.sendGroupMessage(id, content);
      setMessages((prev) => [...prev, response]);
      toast.success("Message sent", { id: toastId });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", { id: toastId });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1">
        <ChatWindow
          chat={group}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
      <div className="w-64 bg-white border-l">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Group Members</h3>
        </div>
        <div className="p-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-3 mb-3">
              <UserAvatar user={member} size="sm" />
              <span className="text-sm">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupRoom;
