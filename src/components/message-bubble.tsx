import React from "react";

interface MessageBubbleProps {
  message: { id: string; text: string; sender: string };
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-md p-3 shadow-md ${
          message.sender === "user"
            ? "bg-primary text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};
