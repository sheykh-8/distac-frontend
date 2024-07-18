import { Message } from "@/models/Message";



export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}