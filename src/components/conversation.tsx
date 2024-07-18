"use client";

import React, { useState, useRef, useEffect } from "react";
import { CornerDownLeft, Paperclip, Delete, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { NewMessageInput } from "./new-message-input";
import { NewConversationModal } from "./new-conversation-modal";
import { ConversationListItem } from "./conversation-list-item";
import { DeleteModal } from "./delete-modal";
import { MessageBubble } from "./message-bubble";

const ConversationLayout = () => {
  const [conversations, setConversations] = useState([
    { id: "1", name: "Conversation 1", lastMessage: "Hello!" },
    { id: "2", name: "Conversation 2", lastMessage: "How are you?" },
  ]);
  const [activeConversation, setActiveConversation] = useState("1");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "user" },
    { id: "2", text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isEditConversationModalOpen, setIsEditConversationModalOpen] =
    useState(false);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);
  const [isDeleteConversationModalOpen, setIsDeleteConversationModalOpen] =
    useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [editingConversation, setEditingConversation] = useState(null as any);
  const [deletingConversation, setDeletingConversation] = useState(null as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (input: string) => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        { id: (messages.length + 1).toString(), text: input, sender: "user" },
      ]);
    }
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  const handleCreateNewConversation = (title: string) => {
    if (title.trim() !== "") {
      const newId = conversations.length + 1;
      setConversations([
        ...conversations,
        {
          id: newId.toString(),
          name: newConversationTitle,
          lastMessage: "New conversation",
        },
      ]);
      setActiveConversation(newId.toString());
      setMessages([]);
      setIsNewConversationModalOpen(false);
      setNewConversationTitle("");
    }
    return Promise.resolve();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleEditConversation = (conversation: any) => {
    setEditingConversation(conversation);
    setNewConversationTitle(conversation.name);
    setIsEditConversationModalOpen(true);
  };

  const handleUpdateConversation = (title: string) => {
    if (title.trim() !== "") {
      setConversations(
        conversations.map((conv) =>
          conv.id === editingConversation.id ? { ...conv, name: title } : conv
        )
      );
    }
    return Promise.resolve();
  };

  const handleDeleteConversation = (conversation: any) => {
    setDeletingConversation(conversation);
    setIsDeleteConversationModalOpen(true);
  };

  const confirmDeleteConversation = () => {
    setConversations(
      conversations.filter((conv) => conv.id !== deletingConversation.id)
    );
    if (activeConversation === deletingConversation.id) {
      setActiveConversation(conversations[0]?.id);
      setMessages([]);
    }
    setIsDeleteConversationModalOpen(false);
    return Promise.resolve();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversation List */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button
            onClick={() => setIsNewConversationModalOpen(true)}
            className="w-full text-white px-4 py-2 rounded-lg focus:outline-none transition duration-200"
          >
            New Conversation
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conv={conv}
              activeConversation={activeConversation}
              onSetActiveConversation={(id) => {
                setActiveConversation(id);
              }}
              onEditConversation={() => {
                handleEditConversation(conv);
              }}
              onDeleteConversation={(conv) => {
                handleDeleteConversation(conv);
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <NewMessageInput
          onSendMessage={(input) => {
            return handleSendMessage(input);
          }}
        />
      </div>
      {(isNewConversationModalOpen || isEditConversationModalOpen) && (
        <NewConversationModal
          open={true}
          title={newConversationTitle}
          onUpdate={(title) => {
            return handleUpdateConversation(title);
          }}
          onCreate={(title) => {
            return handleCreateNewConversation(title);
          }}
          onCancel={function (): void {
            setIsEditConversationModalOpen(false);
            setIsNewConversationModalOpen(false);
            setNewConversationTitle("");
          }}
        />
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteConversationModalOpen && (
        <DeleteModal
          open={true}
          onCancel={() => {
            setIsDeleteConversationModalOpen(false);
          }}
          onConfirm={() => confirmDeleteConversation()}
        />
      )}
    </div>
  );
};

export default ConversationLayout;
