export interface SockMessage {
  chatroomId: number;
  senderId: number;
  action: string;
  content?: string;
  createdAt?: number;
  displayName?: string;
  profileColorIndex?: number;
}
