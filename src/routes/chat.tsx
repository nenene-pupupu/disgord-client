import { tokenAtom } from "@/atoms/AuthAtom";
import { curRoomIdAtom } from "@/atoms/WebSocketAtom";
import ChatChat from "@components/chat/ChatChat";
import ChatEnter from "@components/chat/ChatEnter";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";
import { useAtomValue } from "jotai";

export default function Chat() {
  const token = useAtomValue(tokenAtom);
  const curRoomId = useAtomValue(curRoomIdAtom);

  return (
    <div className="flex flex-row gap-4 h-full">
      <ChatRoomList />
      {token ? (
        curRoomId === 0 ? (
          <ChatEnter />
        ) : (
          <>
            <ChatLayout />
            <div className="flex flex-col gap-4 w-96 h-full mr-2">
              <ChatParticipants />
              <ChatChat />
            </div>
          </>
        )
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
