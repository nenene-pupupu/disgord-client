import React, { useState } from "react";
import useWebSocketWithAuth from "@/hooks/useWebSocketWithAuth";

const Chat: React.FC = () => {
  const { socket, messages } = useWebSocketWithAuth("ws://localhost:8080/ws");
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "MESSAGE", data: input }));
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
