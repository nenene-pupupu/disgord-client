import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import ChatChat from "@components/chat/ChatChat";
import ChatEnter from "@components/chat/ChatEnter";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";

const ChatPage = () => {
  const { token } = useAuth();
  const { curRoomId } = useWebSocket();

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
};
export default ChatPage;
