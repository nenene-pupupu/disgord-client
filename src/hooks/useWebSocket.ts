import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import {
  curRoomIdAtom,
  localStreamAtom,
  messagesAtom,
  participantsAtom,
  remoteStreamsAtom,
  socketAtom,
} from "@/atoms/WebSocketAtom";
import { SockMessage } from "@/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

const URL = "ws://localhost:8080/ws";

export const useWebSocket = () => {
  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);
  const [socket, setSocket] = useAtom(socketAtom);
  const setMessages = useSetAtom(messagesAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const setParticipants = useSetAtom(participantsAtom);
  const pc = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useAtom(localStreamAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  useEffect(() => {
    if (token) {
      console.log("create socket");
      const wsUrl = `${URL}?access_token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket is open now.");
      };

      // ws.onmessage = (event) => {
      //   try {
      //     console.log("Got message:", event.data);
      //     const message: SockMessage = JSON.parse(event.data);
      //     if (message.action === "SEND_TEXT") {
      //       setMessages((prev) => [...prev, message]);
      //     } else if (message.action === "JOIN_ROOM") {
      //       console.log(message.senderId, "join in room", message.chatroomId);
      //       addParticipant(message.senderId);
      //     }
      //   } catch (error) {
      //     console.error("Failed to parse message:", event.data);
      //   }
      // };
      ws.onmessage = async (event) => {
        const message: SockMessage = JSON.parse(event.data);
        switch (message.action) {
          case "SEND_TEXT":
            console.log("send text", message);
            setMessages((prev) => [...prev, message]);
            break;

          /* TODO: 채팅 참여/퇴장 메세지 */

          case "JOIN_ROOM": {
            // const joinMsg: SockMessage = {
            //   chatroomId: message.chatroomId,
            //   action: "ANNOUNCE",
            //   senderId: message.senderId,
            //   content: `${message.content} joined the chatroom`,
            // };
            // setMessages((prev) => [...prev, joinMsg]);
            console.log("join room", message);
            appendParticipant(message.senderId);
            break;
          }
          case "LEAVE_ROOM": {
            // const leaveMsg: SockMessage = {
            //   chatroomId: message.chatroomId,
            //   action: "ANNOUNCE",
            //   senderId: message.senderId,
            //   content: `${message.content} leaved the chatroom`,
            // };
            // setMessages((prev) => [...prev, leaveMsg]);
            console.log("leave room", message);
            break;
          }
          case "OFFER":
            if (message.content) {
              const offer: RTCSessionDescriptionInit = JSON.parse(
                message.content,
              );
              pc.current?.setRemoteDescription(offer);
              pc.current?.createAnswer().then((answer) => {
                pc.current?.setLocalDescription(answer);
                ws.send(
                  JSON.stringify({
                    chatroomId: curRoomId,
                    senderId: userId,
                    action: "ANSWER",
                    content: JSON.stringify(answer),
                  }),
                );
              });
              break;
            }
            break;
          case "CANDIDATE":
            if (message.content) {
              const candidate: RTCIceCandidateInit = JSON.parse(
                message.content,
              );
              pc.current?.addIceCandidate(candidate);
            }
            break;
          default:
            console.error("Unknown action:", message.action);
        }
      };

      ws.onclose = () => {
        if (curRoomId !== 0) {
          sendMessage({
            chatroomId: curRoomId,
            senderId: userId!,
            action: "LEAVE_ROOM",
            content: "",
          });
        }
        console.log("WebSocket is closed now.");
      };

      setSocket(ws);

      return () => {
        setCurRoomId(0);
        setSocket(null);
        ws.close();
      };
    }
  }, [token]);

  const appendParticipant = (id: number) => {
    setParticipants((prev) => {
      const participantExists = prev?.some(
        (participant) => participant.userId === id,
      );

      if (participantExists) {
        return prev;
      }

      return [
        ...(prev || []),
        {
          userId: id,
          muted: true,
          camOn: false,
        },
      ];
    });
  };

  const sendMessage = (message: SockMessage) => {
    socket?.send(JSON.stringify(message));
  };

  const appendMessages = (messages: SockMessage[]) => {
    setMessages([...messages]);
  };

  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error("[ERROR] Error obtaining local stream: ", error);
      return null;
    }
  };

  const createPeerConnection = async () => {
    let stream = localStream;
    if (!stream) {
      stream = await getLocalStream();
    }

    if (!stream) {
      console.error("[ERROR] Local stream is not available");
      return null;
    }

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.current?.addTrack(track, stream));

    pc.current.ontrack = (event) => {
      if (event.track.kind === "audio") {
        return;
      }
      setRemoteStreams((prev) => [...prev, event.streams[0]]);
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({
          chatroomId: curRoomId,
          senderId: userId!,
          action: "CANDIDATE",
          content: JSON.stringify(event.candidate),
        });
      }
    };

    return pc.current;
  };

  const changeRoom = async (newRoomId: number) => {
    sendMessage({
      chatroomId: curRoomId,
      senderId: userId!,
      action: "LEAVE_ROOM",
      content: "",
    });
    localStream?.getTracks().forEach((track) => track.stop());
    pc.current?.close();
    pc.current = null;
    setRemoteStreams([]);

    setCurRoomId(newRoomId);

    const stream = await getLocalStream();

    if (!stream) {
      console.error("[ERROR] Local stream is not available");
      return null;
    }

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.current?.addTrack(track, stream));
    setLocalStream(stream);

    pc.current.ontrack = (event) => {
      if (event.track.kind === "audio") {
        return;
      }
      setRemoteStreams((prev) => [...prev, event.streams[0]]);
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({
          chatroomId: newRoomId,
          senderId: userId!,
          action: "CANDIDATE",
          content: JSON.stringify(event.candidate),
        });
      }
    };
  };

  const startCall = async () => {
    if (!pc.current) {
      const peerConnection = await createPeerConnection();
      if (!peerConnection) {
        console.error("[ERROR] Failed to create peer connection");
        return;
      }
    }
  };

  const endCall = () => {
    localStream?.getTracks().forEach((track) => track.stop());
    pc.current?.close();
    pc.current = null;
    setLocalStream(null);
    setRemoteStreams([]);
  };

  return {
    changeRoom,
    startCall,
    endCall,
    sendMessage,
    appendMessages,
  };
};
