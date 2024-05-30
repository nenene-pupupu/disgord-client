import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { SockMessage } from "@/types";

const useWebSocketWithAuth = (url: string) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<SockMessage[]>([]);

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
          console.log("Got message:", event.data);
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

  const sendMessage = (message: SockMessage) => {
    if (socket) {
      console.log("Sending message:", message);
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  const appendMessages = (messages: SockMessage[]) => {
    if (socket) {
      console.log("Appending message:", messages);
      setMessages([...messages]);
    }
  };
  return { socket, messages, sendMessage, appendMessages };
};

export default useWebSocketWithAuth;
