import React from "react";
import { useAuthStore } from "../../store/authStore";

export default function Messages({ item }) {
  const { user, isLoading } = useAuthStore();

  const myMessages = user._id === item.senderId;

  const time = new Date(item.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="">
      <div className={`chat flex flex-col ${myMessages ? "chat-end" : "chat-start"}`}>
        <div className={`chat-bubble ${myMessages ? "bg-accent" : ""}`}>
          {item.message}
        </div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
    
    </div>
  );
}
