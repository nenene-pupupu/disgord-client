import ChatChat from "@components/chat/ChatChat";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";
import { useState } from "react";

export default function Chat() {
  const [isLogin, setisLogin] = useState(false);

  return (
    <div
      className="flex flex-row gap-4 h-full"
      onClick={() => setisLogin((p) => !p)}
    >
      <ChatRoomList />
      {isLogin ? (
        <>
          <ChatLayout />
          <div className="flex flex-col gap-4 w-96 h-full mr-2">
            <ChatParticipants />
            <ChatChat />
          </div>
        </>
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
