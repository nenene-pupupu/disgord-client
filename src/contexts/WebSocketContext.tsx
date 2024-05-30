import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { SockMessage } from "@/types";

interface WebSocketContextProps {
  socket: WebSocket | null;
  messages: SockMessage[];
  sendMessage: (message: SockMessage) => void;
  appendMessages: (messages: SockMessage[]) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined,
);

export const WebSocketProvider = ({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) => {
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
          const message: SockMessage = JSON.parse(event.data);
          if (message.action === "SEND_TEXT") {
            setMessages((prev) => [...prev, message]);
          }
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
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  const appendMessages = (messages: SockMessage[]) => {
    console.log("try to append...");
    if (socket) {
      console.log("Appending message:", messages);
      setMessages([...messages]);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ socket, messages, sendMessage, appendMessages }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
