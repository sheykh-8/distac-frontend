"use client";

import ChatScreen from "@/components/conversation";
import { useConversation } from "@/hooks/useConversation";

export default function Dashbaord() {
  const conversation = useConversation();
  return (
    <ChatScreen
      onNewConversation={(title: string) => {
        return conversation.addNewConversation(title);
      }}
      onSubmitNewMessage={(content) => conversation.submitMessage(content)}
      conversations={conversation.conversationList}
      messages={conversation.messageList}
      selectedConversation={conversation.selectedConversation}
      setSelectedConversation={(id) => conversation.setSelectedConversation(id)}
      onDeleteConversation={(id) => conversation.deleteConversation(id)}
      onEditConversation={(id, title) =>
        conversation.renameConversation(id, title)
      }
    />
  );
}
