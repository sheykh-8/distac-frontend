import { Message } from "@/models/Message";
import React from "react";
import { AudioPlayer } from "./audio-player";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={`flex ${
        message.user === "bot" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-md p-3 shadow-md ${
          message.user === "bot"
            ? "bg-white text-gray-800"
            : "bg-primary text-white"
        }`}
      >
        {message.content}
        {message.audio ? <AudioPlayer audioUrl={message.audio} filename="synthesized.wav" /> : null}
      </div>
    </div>
  );
};
