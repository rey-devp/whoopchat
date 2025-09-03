import React from "react";

const UserAvatar = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden`}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500 font-medium">
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
