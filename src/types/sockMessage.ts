export interface SockMessage {
  chatroomId: number;
  senderId: number;
  action: string;
  content?: string;
}
