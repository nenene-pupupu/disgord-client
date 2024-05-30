import { IconSky } from "@/assets/svg";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useAuth } from "@/hooks/useAuth";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { SockMessage, User } from "@/types";
// import parseTime from "@/utils/parseTime";
import { useEffect, useRef } from "react";

const ChatChat = ({ target }: { target: number }) => {
  const { token } = useAuth();
  const chatRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, appendMessages } = useWebSocket();

  useEffect(() => {
    const getChat = async () => {
      if (!token || !target) return;
      const res = await fetchWithAuth(
        token,
        `http://localhost:8080/chats?chatroomId=${target}`,
      );
      if (!res.ok) {
        throw new Error("Failed to delete chatroom");
      }
      const data: SockMessage[] = await res.json();
      appendMessages(data);
    };
    getChat();
  }, [token, target]);

  const handleSendMessage = async () => {
    if (!token) return;
    if (!chatRef.current || chatRef.current?.value === "") return;
    const res = await fetchWithAuth(token, "http://localhost:8080/users/me");
    if (!res.ok) {
      console.log("err while getting my information");
      return;
    }
    const data: User = await res.json();

    sendMessage({
      chatroomId: target,
      senderId: data.id,
      action: "SEND_TEXT",
      content: chatRef.current?.value,
    });
    chatRef.current.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div>
        <h2 className="text-2xl mb-4">Chat</h2>
      </div>
      <div className="flex-1 relative overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-b from-white to-transparent h-2 w-full"></div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          {messages.map((v, i) => (
            <div key={i} className="flex gap-2">
              <img src={IconSky} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p>{v.senderId}</p>
                  <p className="text-gray-300 text-sm">
                    {/* {parseTime(v.createdAt)} */}
                    00:00
                  </p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p>{v.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent h-2 w-full"></div>
      </div>

      <div className="flex mt-2">
        <input
          ref={chatRef}
          type="text"
          placeholder="Type a message..."
          className="p-4 bg-gray-100 rounded-tl-md w-full outline-none"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          type="submit"
          className="bg-sky-500 rounded-tr-md text-white text-xs px-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatChat;
