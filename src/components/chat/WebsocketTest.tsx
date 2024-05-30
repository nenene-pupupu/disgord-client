import React from "react";
import useWebSocketWithAuth from "@/hooks/useWebSocketWithAuth";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { useAuth } from "@/hooks/useAuth";

const WebsocketTest: React.FC = () => {
  const { token } = useAuth();
  const { messages, sendMessage } = useWebSocketWithAuth(
    "ws://localhost:8080/ws",
  );

  const handleSendMessage = () => {
    sendMessage({
      chatroomId: 1,
      senderId: 1,
      action: "SEND_TEXT",
      content: "Hello, world!",
    });
  };

  const getMsgs = async () => {
    if (!token) return;
    const res = await fetchWithAuth(token, "http://localhost:8080/chats", {
      method: "GET",
    });
    const data = await res?.json();
    console.log(data);
  };

  return (
    <div>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{JSON.stringify(message)}</div>
        ))}
      </div>
      <div>
        <button onClick={getMsgs}>GetMessges</button>
      </div>
    </div>
  );
};

export default WebsocketTest;
