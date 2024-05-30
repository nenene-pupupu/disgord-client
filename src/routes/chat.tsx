import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { useAuth } from "@/hooks/useAuth";
import ChatChat from "@components/chat/ChatChat";
import ChatEnter from "@components/chat/ChatEnter";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";
import { useState } from "react";

export default function Chat() {
  const { token } = useAuth();
  const [target, setTarget] = useState<number>(-1);

  return (
    <div className="flex flex-row gap-4 h-full">
      <ChatRoomList target={target} setTarget={setTarget} />
      {token ? (
        <WebSocketProvider url="ws://localhost:8080/ws">
          {target === -1 ? (
            <ChatEnter />
          ) : (
            <>
              <ChatLayout target={target} setTarget={setTarget} />
              <div className="flex flex-col gap-4 w-96 h-full mr-2">
                <ChatParticipants target={target} />
                <ChatChat target={target} />
              </div>
            </>
          )}
        </WebSocketProvider>
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
