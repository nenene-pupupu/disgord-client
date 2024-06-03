import { createContext, useState, useEffect, ReactNode, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SockMessage } from "@/types";

interface WebSocketContextProps {
  socket: WebSocket | null;
  messages: SockMessage[];
  curRoomId: number;
  targetRoomId: number;
  sendMessage: (message: SockMessage) => void;
  appendMessages: (messages: SockMessage[]) => void;
  setCurRoomId: (id: number) => void;
  setTargetRoomId: (id: number) => void;
  localStream: MediaStream | null;
  remoteStreams: MediaStream[];
  startCall: () => void;
  endCall: () => void;
  audioOn: boolean;
  videoOn: boolean;
  handleAudioMute: () => void;
  handleVideoMute: () => void;
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined);

export const WebSocketProvider = ({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) => {
  const { token, userId } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<SockMessage[]>([]);
  const [curRoomId, setCurRoomId] = useState<number>(0);
  const [targetRoomId, setTargetRoomId] = useState<number>(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [audioOn, setAudioOn] = useState<boolean>(true);
  const [videoOn, setVideoOn] = useState<boolean>(true);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const pc = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (token) {
      const wsUrl = `${url}?access_token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket is open now.");
      };

      ws.onmessage = async (event) => {
        const message: SockMessage = JSON.parse(event.data);
        console.log("[DEBUG] receive", message);
        switch (message.action) {
          case "SEND_TEXT":
            setMessages((prev) => [...prev, message]);
            break;
          case "JOIN_ROOM":
            // console.log("JOIN_ROOM", message);
            break;
          case "OFFER":
            if (message.content) {
              const offer: RTCSessionDescriptionInit = JSON.parse(
                message.content,
              );
              pc.current?.setRemoteDescription(offer);
              pc.current?.createAnswer().then((answer) => {
                pc.current?.setLocalDescription(answer);
                console.log("sending in connect():offer", {
                  chatroomId: curRoomId,
                  senderId: userId,
                  action: "ANSWER",
                  content: JSON.stringify(answer),
                });

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
              // await handleOffer(offer);
            }
            break;
          case "CANDIDATE":
            if (message.content) {
              const candidate: RTCIceCandidateInit = JSON.parse(
                message.content,
              );
              pc.current?.addIceCandidate(candidate);

              // await handleCandidate(candidate);
              // handleCandidate(candidate);
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

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, url]);

  // const handleOffer = async (offer: RTCSessionDescriptionInit) => {
  //   if (!pc.current) createPeerConnection();
  //   await pc.current?.setRemoteDescription(offer);
  //   // await pc.current?.setRemoteDescription(new RTCSessionDescription(offer));
  //   const answer = await pc.current?.createAnswer();
  //   await pc.current?.setLocalDescription(answer);
  //   console.log("sending in offer");

  //   sendMessage({
  //     chatroomId: curRoomId,
  //     senderId: userId!,
  //     action: "ANSWER",
  //     content: JSON.stringify(answer),
  //   });
  // };

  // const handleCandidate = (candidate: RTCIceCandidateInit) => {
  //   try {
  //     if (pc.current) {
  //       // await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  //       pc.current.addIceCandidate(candidate);
  //     }
  //   } catch (error) {
  //     console.error("Error adding received ICE candidate", error);
  //   }
  // };

  // const handleCandidate = async (candidate: RTCIceCandidateInit) => {
  //   try {
  //     if (pc.current) {
  //       await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  //     }
  //   } catch (error) {
  //     console.error("Error adding received ICE candidate", error);
  //   }
  // };

  const sendMessage = (message: SockMessage) => {
    console.log("[DEBUG] sending", message);
    socket?.send(JSON.stringify(message));
  };

  const appendMessages = (messages: SockMessage[]) => {
    setMessages([...messages]);
  };

  const getLocalStream = async () => {
    console.log("[DEBUG] getLocalStream()");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      console.log("[INFO] Local stream obtained successfully");
      return stream; // 직접 스트림을 반환
    } catch (error) {
      console.error("[ERROR] Error obtaining local stream: ", error);
      return null;
    }
  };

  const createPeerConnection = async () => {
    console.log("[DEBUG] createPeerConnection()", localStream);
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
      console.log("[DEBUG] ontrack()");
      if (event.track.kind === "audio") {
        return;
      }
      setRemoteStreams((prev) => [...prev, event.streams[0]]);
    };

    pc.current.onicecandidate = (event) => {
      console.log("sending in icecandidate");
      if (event.candidate) {
        sendMessage({
          chatroomId: curRoomId,
          senderId: userId!,
          action: "CANDIDATE",
          content: JSON.stringify(event.candidate),
        });
      }
    };

    console.log("[INFO] Peer connection created successfully");
    return pc.current;
  };

  const startCall = async () => {
    console.log("[DEBUG] startCall()");

    if (!pc.current) {
      const peerConnection = await createPeerConnection();
      if (!peerConnection) {
        console.error("[ERROR] Failed to create peer connection");
        return;
      }
    }

    console.log("[INFO] Call started successfully");
  };

  const endCall = () => {
    console.log("[DEBUG] endCall()");

    localStream?.getTracks().forEach((track) => track.stop());
    pc.current?.close();
    pc.current = null;
    setLocalStream(null);
    setRemoteStreams([]);
  };

  const handleAudioMute = () => {
    localStream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioOn((prev) => !prev);
  };

  const handleVideoMute = () => {
    localStream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideoOn((prev) => !prev);
  };

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        messages,
        curRoomId,
        targetRoomId,
        sendMessage,
        appendMessages,
        setCurRoomId,
        setTargetRoomId,
        localStream,
        remoteStreams,
        startCall,
        endCall,
        audioOn,
        videoOn,
        handleAudioMute,
        handleVideoMute,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
