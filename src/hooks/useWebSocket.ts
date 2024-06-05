import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { audioOnAtom } from "@/atoms/ParticipantAtom";
import {
  curRoomIdAtom,
  localStreamAtom,
  messagesAtom,
  participantsAtom,
  remoteStreamsAtom,
  socketAtom,
} from "@/atoms/WebSocketAtom";
import { SockClient, SockMessage } from "@/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

const URL = `ws://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/ws`;

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
  const audioOn = useAtomValue(audioOnAtom);

  useEffect(() => {
    if (token) {
      const wsUrl = `${URL}?access_token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket is open now.");
      };

      ws.onmessage = async (event) => {
        const message: SockMessage = JSON.parse(event.data);
        console.log("message", message);
        switch (message.action) {
          case "SEND_TEXT":
            console.log("send text", message);
            setMessages((prev) => [...prev, message]);
            break;

          case "LIST_USERS": {
            if (message.content) {
              let parsedUsers: SockClient[] = JSON.parse(message.content);
              const currentUserIndex = parsedUsers.findIndex(
                (user) => user.userId === userId,
              );

              if (currentUserIndex !== -1) {
                const [currentUser] = parsedUsers.splice(currentUserIndex, 1);
                parsedUsers = [currentUser, ...parsedUsers];
              }
              setParticipants(parsedUsers);
            }
            break;
          }

          case "KICKED":
            alert("Chatroom has been deleted");
            setCurRoomId(0);
            break;

          case "OFFER":
            if (message.content) {
              const offer: RTCSessionDescriptionInit = JSON.parse(
                message.content as string,
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
                message.content as string,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const sendMessage = (message: SockMessage) => {
    socket?.send(JSON.stringify(message));
  };

  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getAudioTracks().forEach((track) => (track.enabled = audioOn));
      stream.getVideoTracks().forEach((track) => (track.enabled = false));

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
      console.log(event);
      setRemoteStreams((prev) => [...prev, event.streams[0]]);

      event.streams[0].onremovetrack = () => {
        setRemoteStreams((prev) =>
          prev.filter((s) => s.id !== event.streams[0].id),
        );
      };
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
    setRemoteStreams(
      (prev) =>
        prev?.filter((stream) => stream.id !== `remoteStream-${6}`) || [],
    );
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
      event.streams[0].onremovetrack = () => {
        setRemoteStreams((prev) =>
          prev.filter((s) => s.id !== event.streams[0].id),
        );
      };
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
  };
};
