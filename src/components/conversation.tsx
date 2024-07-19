"use client";

import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { NewMessageInput } from "@/components/new-message-input";
import { NewConversationModal } from "@/components/new-conversation-modal";
import { ConversationListItem } from "@/components/conversation-list-item";
import { DeleteModal } from "@/components/delete-modal";
import { MessageBubble } from "@/components/message-bubble";
import { Conversation as ConversationType } from "@/models/Conversation";
import { Message } from "@/models/Message";

interface ConversationProps {
  onNewConversation: (title: string) => Promise<void>;
  onSubmitNewMessage: (content: string) => Promise<void>;
  conversations: ConversationType[];
  messages: Message[];
  selectedConversation: string;
  setSelectedConversation: (id: string) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  onNewConversation,
  onSubmitNewMessage,
  conversations = [],
  messages = [],
  selectedConversation,
  setSelectedConversation,
}) => {
  // const [activeConversation, setActiveConversation] = useState("1");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isEditConversationModalOpen, setIsEditConversationModalOpen] =
    useState(false);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);
  const [isDeleteConversationModalOpen, setIsDeleteConversationModalOpen] =
    useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (input: string) => {
    if (input.trim() !== "") {
      return onSubmitNewMessage(input);
    }
    return Promise.resolve();
  };

  const handleCreateNewConversation = (title: string) => {
    if (title.trim() !== "") {
      return onNewConversation(title);
    }
    return Promise.resolve();
  };

  const handleEditConversation = (conversation: ConversationType) => {
    setNewConversationTitle(conversation.title);
    setIsEditConversationModalOpen(true);
  };

  const handleUpdateConversation = (title: string) => {
    if (title.trim() !== "") {
    }
    return Promise.resolve();
  };

  const handleDeleteConversation = (conversation: any) => {
    setIsDeleteConversationModalOpen(true);
  };

  const confirmDeleteConversation = () => {
    // setConversations(
    //   conversations.filter((conv) => conv.id !== deletingConversation.id)
    // );
    // if (activeConversation === deletingConversation.id) {
    //   setActiveConversation(conversations[0]?.id);
    //   setMessages([]);
    // }
    // setIsDeleteConversationModalOpen(false);
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
              activeConversation={selectedConversation}
              onSetActiveConversation={(id) => {
                setSelectedConversation(id);
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

export default Conversation;
