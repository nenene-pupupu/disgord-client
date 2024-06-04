import { tokenAtom } from "@/atoms/AuthAtom";
import { curRoomIdAtom } from "@/atoms/WebSocketAtom";
import { useWebSocket } from "@/hooks/useWebSocket";
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

  const { sendMessage, appendMessages, startCall, changeRoom, endCall } =
    useWebSocket();

  return (
    <div className="flex flex-row gap-4 h-full">
      <ChatRoomList startCall={startCall} changeRoom={changeRoom} />
      {token ? (
        curRoomId === 0 ? (
          <ChatEnter />
        ) : (
          <>
            <ChatLayout sendMessage={sendMessage} endCall={endCall} />
            <div className="flex flex-col gap-4 w-96 h-full mr-2">
              <ChatParticipants />
              <ChatChat
                sendMessage={sendMessage}
                appendMessages={appendMessages}
              />
            </div>
          </>
        )
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
