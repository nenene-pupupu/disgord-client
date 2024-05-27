export interface Message {
  chatroomId: number;
  senderId: number;
  action: string;
  content?: string;
}
