import { tokenAtom, userIdAtom } from "@/atoms/Auth";
import {
  curRoomIdAtom,
  messagesAtom,
  socketAtom,
  targetRoomIdAtom,
} from "@/atoms/WebSocketAtom";
import { SockMessage } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

// interface WebSocketContextProps {
//   socket: WebSocket | null;
//   messages: SockMessage[];
//   curRoomId: number;
//   targetRoomId: number;
//   sendMessage: (message: SockMessage) => void;
//   appendMessages: (messages: SockMessage[]) => void;
//   setCurRoomId: (id: number) => void;
//   setTargetRoomId: (id: number) => void;
// }

const URL = "ws://localhost:8080/ws";

export const useWebSocket = () => {
  // const { token, userId } = useAuth();
  const [socket, setSocket] = useAtom(socketAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const [targetRoomId, setTargetRoomId] = useAtom(targetRoomIdAtom);

  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);

  useEffect(() => {
    if (token) {
      const wsUrl = `${URL}?access_token=${token}`;
      console.log("Connecting to WebSocket URL:", wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket is open now.");
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

      ws.onclose = async (event) => {
        console.log("closing websocket");
        if (token) {
          ws.send(
            JSON.stringify({
              chatroomId: curRoomId,
              senderId: userId,
              action: "LEAVE_ROOM",
            }),
          );
        }

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
  }, [token]);

  const sendMessage = (message: SockMessage) => {
    if (socket) {
      console.log("Sending message:", message);
      socket.send(JSON.stringify(message));
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

  return {
    socket,
    messages,
    curRoomId,
    targetRoomId,
    sendMessage,
    appendMessages,
    setCurRoomId,
    setTargetRoomId,
  };
};

// export const useWebSocket = () => {
//   const context = useContext(WebSocketContext);
//   if (context === undefined) {
//     throw new Error("useWebSocket must be used within a WebSocketProvider");
//   }
//   return context;
// };
