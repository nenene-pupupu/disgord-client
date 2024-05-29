import React from "react";
import useWebSocketWithAuth from "@/hooks/useWebSocketWithAuth";
import useFetchWithAuth from "@/hooks/useFetchWithAuth";

const Chat: React.FC = () => {
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

  const fetchWithAuth = useFetchWithAuth();

  const getMsgs = async () => {
    const res = await fetchWithAuth("http://localhost:8080/chats", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
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

export default Chat;
