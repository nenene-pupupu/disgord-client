import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const useWebSocketWithAuth = (url: string) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      const wsUrl = `${url}?access_token=${token}`;
      console.log("Connecting to WebSocket URL:", wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket is open now.");
        ws.send(JSON.stringify({ type: "AUTH", token }));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prev) => [...prev, message]);
        } catch (error) {
          console.error("Failed to parse message:", event.data);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket is closed now:", event);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);

      return () => {
        console.log("Cleaning up WebSocket connection.");
        ws.close();
      };
    }
  }, [token, url]);

  const sendMessage = (message: {
    chatroomId: number;
    senderId: number;
    action: string;
    content?: string;
  }) => {
    if (socket) {
      console.log("Sending message:", message);
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return { socket, messages, sendMessage };
};

export default useWebSocketWithAuth;
