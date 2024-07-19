import { Message } from "@/models/Message";



export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  user: string;
}