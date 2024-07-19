import { Conversation } from "@/models/Conversation"
import { Message } from "@/models/Message"
import { DocumentData } from "firebase/firestore"


export const conversationConverter = {
  fromFirestore: (doc: DocumentData) => {
    return {
      id: doc.id,
      title: doc.data().title,
      createdAt: doc.data().createdAt.toDate(),
      user: doc.data().user,
    } as Conversation
  },
  toFirestore: (doc: Conversation) => {
    return {
      title: doc.title,
      createdAt: doc.createdAt,
      user: doc.user,
    }
  }
}


export const messageConverter = {
  fromFirestore: (doc: DocumentData) => {
    return {
      id: doc.id,
      content: doc.data().content,
      audio: doc.data().audio,
      createdAt: doc.data().createdAt.toDate(),
      user: doc.data().user,
    } as Message
  },
  toFirestore: (doc: Message) => {
    return {
      content: doc.content,
      createdAt: doc.createdAt,
      user: doc.user,
    }
  }
}