export interface Chatroom {
  createdAt: string;
  id: number;
  name: string;
  ownerId: number;
  password: string;
  isPrivate: boolean;
  profileColorIndex: number;
}
