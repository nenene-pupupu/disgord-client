import { WebSocketProvider } from "@/contexts/WebSocketContext";
import ChatPage from "@components/chat/ChatPage";

export default function Chat() {
  return (
    <WebSocketProvider url="ws://localhost:8080/ws">
      <ChatPage />
    </WebSocketProvider>
  );
}
