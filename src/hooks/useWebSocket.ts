import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import {
  curRoomIdAtom,
  messagesAtom,
  socketAtom,
  targetRoomIdAtom,
} from "@/atoms/WebSocketAtom";
import { SockMessage, sockClient } from "@/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const URL = "ws://localhost:8080/ws";

export const useWebSocket = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const setMessages = useSetAtom(messagesAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const setTargetRoomId = useSetAtom(targetRoomIdAtom);
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
          } else if (message.action === "JOIN_ROOM") {
            console.log(message.senderId, "join in room", message.chatroomId);
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

  const addParticipant = (client: sockClient) => {
    if (socket) {
      console.log("Adding client:", client);
      socket.send(JSON.stringify(client));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

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
    sendMessage,
    appendMessages,
    setCurRoomId,
    setTargetRoomId,
    addParticipant,
  };
};
