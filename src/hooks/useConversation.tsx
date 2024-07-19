"use client";
/**
 * This hook contains all the logic for the conversatios and messages, from creating a new conversation to sending a message and retrieving the messages.
 */

import { useEffect, useState } from "react";
import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "@/hooks/useFirebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  CONVERSATION_COLLECTION,
  MESSAGE_COLLECTION,
} from "@/constant/collection-names";
import { conversationConverter, messageConverter } from "@/lib/converters";

export const useConversation = () => {
  // getting the authenticated user:
  const { auth, firestore } = useFirebase();
  const [user, loading, error] = useAuthState(auth);

  const [conversationQuery, setConversationQuery] = useState<Query | null>(
    null
  );
  const [messageQuery, setMessageQuery] = useState<Query | null>(null);

  useEffect(() => {
    if (user) {
      setConversationQuery(
        query(
          query(
            collection(firestore, CONVERSATION_COLLECTION),
            where("user", "==", user.uid)
          ),
          orderBy("createdAt", "desc")
        ).withConverter(conversationConverter)
      );
    }
  }, [user]);

  const [selectedConversation, setSelectedConversation] = useState<string>("");

  const [conversations, conversationLoading, conversationError] =
    useCollection(conversationQuery);

  const [conversationMessages, messageLoading, messageError] =
    useCollection(messageQuery);

  useEffect(() => {
    if (selectedConversation) {
      setMessageQuery(
        query(
          collection(
            doc(firestore, CONVERSATION_COLLECTION, selectedConversation),
            MESSAGE_COLLECTION
          ),
          orderBy("createdAt", "asc")
        ).withConverter(messageConverter)
      );
    }
  }, [selectedConversation]);

  // selecting the first conversation from the list:
  useEffect(() => {
    if (conversations?.docs.length) {
      setSelectedConversation(conversations.docs[0].id);
    }
  }, [conversations]);

  async function addNewConversation(title: string) {
    if (!user) {
      throw new Error("not authenticated");
    }
    const newConversation: Partial<Conversation> = {
      title,
      createdAt: new Date(),
      user: user.uid,
    };
    const reference = collection(
      firestore,
      CONVERSATION_COLLECTION
    ).withConverter(conversationConverter);
    await addDoc(reference, newConversation);
  }

  async function submitMessage(content: string) {
    if (!user || !selectedConversation) {
      throw new Error("not authenticated");
    }
    const newMessage: Partial<Message> = {
      content,
      createdAt: new Date(),
      user: user.uid,
    };
    const reference = collection(
      doc(firestore, CONVERSATION_COLLECTION, selectedConversation),
      MESSAGE_COLLECTION
    ).withConverter(messageConverter);

    await addDoc(reference, newMessage);
  }

  async function deleteConversation(conversationId: string) {
    if (!user) {
      throw new Error("not authenticated");
    }
    const reference = doc(firestore, CONVERSATION_COLLECTION, conversationId);
    await deleteDoc(reference);
  }

  async function renameConversation(conversationId: string, title: string) {
    if (!user) {
      throw new Error("not authenticated");
    }
    const reference = doc(firestore, CONVERSATION_COLLECTION, conversationId);
    await updateDoc(reference, { title });
  }

  return {
    conversationList: (conversations?.docs ?? []).map(
      (doc) => doc.data() as Conversation
    ),
    messageList: (conversationMessages?.docs ?? []).map(
      (doc) => doc.data() as Message
    ),
    selectedConversation,
    setSelectedConversation,
    addNewConversation,
    submitMessage,
    deleteConversation,
    renameConversation
  };
};
