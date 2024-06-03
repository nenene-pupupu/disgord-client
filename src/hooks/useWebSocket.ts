import { tokenAtom, userIdAtom } from "@/atoms/Auth";
import { curRoomIdAtom, messagesAtom, socketAtom } from "@/atoms/WebSocketAtom";
import { SockMessage } from "@/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const URL = "ws://localhost:8080/ws";

export const useWebSocket = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const setMessages = useSetAtom(messagesAtom);
  // const [messages, setMessages] = useAtom(messagesAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);

  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);

  useEffect(() => {
    if (token && !socket) {
      const wsUrl = `${URL}?access_token=${token}`;
      if (!socket) {
        console.log("Connecting to WebSocket URL:", wsUrl);
        setSocket(new WebSocket(wsUrl));
      }
    }
  }, [token]);

  useEffect(() => {
    console.log("socket", socket);
    if (token && socket) {
      socket.onopen = () => {
        console.log("WebSocket is open now.");
      };

      socket.onmessage = (event) => {
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

      socket.onclose = async (event) => {
        console.log("closing websocket");
        if (token) {
          socket.send(
            JSON.stringify({
              chatroomId: curRoomId,
              senderId: userId,
              action: "LEAVE_ROOM",
            }),
          );
        }

        console.log("WebSocket is closed now:", event);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        console.log("Cleaning up WebSocket connection.");
        setCurRoomId(0);
        setSocket(null);
        socket.close();
      };
    }
  }, [token, socket]);

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
    // socket,
    // messages,
    // curRoomId,
    // targetRoomId,
    sendMessage,
    appendMessages,
    // setCurRoomId,
    // setTargetRoomId,
  };
};
