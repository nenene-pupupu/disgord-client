// import { tokenAtom, userIdAtom } from "@/atoms/Auth";
// import { SockMessage } from "@/types";
// import { useAtomValue } from "jotai";
// import { ReactNode, createContext, useEffect, useState } from "react";

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

// export const WebSocketContext = createContext<
//   WebSocketContextProps | undefined
// >(undefined);

// export const WebSocketProvider = ({
//   url,
//   children,
// }: {
//   url: string;
//   children: ReactNode;
// }) => {
//   // const { token, userId } = useAuth();
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<SockMessage[]>([]);
//   const [curRoomId, setCurRoomId] = useState<number>(0);
//   const [targetRoomId, setTargetRoomId] = useState<number>(0);

//   const token = useAtomValue(tokenAtom);
//   const userId = useAtomValue(userIdAtom);

//   useEffect(() => {
//     if (token) {
//       const wsUrl = `${url}?access_token=${token}`;
//       console.log("Connecting to WebSocket URL:", wsUrl);
//       const ws = new WebSocket(wsUrl);

//       ws.onopen = () => {
//         console.log("WebSocket is open now.");
//       };

//       ws.onmessage = (event) => {
//         try {
//           console.log("Got message:", event.data);
//           const message: SockMessage = JSON.parse(event.data);
//           if (message.action === "SEND_TEXT") {
//             setMessages((prev) => [...prev, message]);
//           }
//         } catch (error) {
//           console.error("Failed to parse message:", event.data);
//         }
//       };

//       ws.onclose = async (event) => {
//         console.log("closing websocket");
//         if (token) {
//           ws.send(
//             JSON.stringify({
//               chatroomId: curRoomId,
//               senderId: userId,
//               action: "LEAVE_ROOM",
//             }),
//           );
//         }

//         console.log("WebSocket is closed now:", event);
//       };

//       ws.onerror = (error) => {
//         console.error("WebSocket error:", error);
//       };

//       setSocket(ws);

//       return () => {
//         console.log("Cleaning up WebSocket connection.");
//         ws.close();
//       };
//     }
//   }, [token, url]);

//   const sendMessage = (message: SockMessage) => {
//     if (socket) {
//       console.log("Sending message:", message);
//       socket.send(JSON.stringify(message));
//     } else {
//       console.error("WebSocket is not connected.");
//     }
//   };

//   const appendMessages = (messages: SockMessage[]) => {
//     if (socket) {
//       console.log("Appending message:", messages);
//       setMessages([...messages]);
//     }
//   };

//   return (
//     <WebSocketContext.Provider
//       value={{
//         socket,
//         messages,
//         curRoomId,
//         targetRoomId,
//         sendMessage,
//         appendMessages,
//         setCurRoomId,
//         setTargetRoomId,
//       }}
//     >
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
