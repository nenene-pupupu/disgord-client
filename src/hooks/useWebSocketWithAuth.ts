import { useAuth } from "@components/Auth/AuthContext";
import { useEffect, useState } from "react";

const useWebSocketWithAuth = (url: string) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      // const ws = new WebSocket(url, ["protocolOne", "protocolTwo"]);
      const ws = new WebSocket(url);
      ws.onopen = () => {
        console.log("WebSocket is open now.");
        ws.send(JSON.stringify({ type: "AUTH", token }));
      };

      ws.onmessage = (event) => {
        const message = event.data;
        setMessages((prev) => [...prev, message]);
      };

      ws.onclose = () => {
        console.log("WebSocket is closed now.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [token, url]);

  return { socket, messages };
};

export default useWebSocketWithAuth;
