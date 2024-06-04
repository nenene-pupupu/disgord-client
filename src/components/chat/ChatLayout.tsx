import { userIdAtom } from "@/atoms/AuthAtom";
import { audioOnAtom, soundOnAtom, videoOnAtom } from "@/atoms/ParticipantAtom";
import {
  curRoomIdAtom,
  localStreamAtom,
  remoteStreamsAtom,
} from "@/atoms/WebSocketAtom";
import { SockMessage } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import {
  IoMic,
  IoMicOff,
  IoPerson,
  IoVideocam,
  IoVideocamOff,
} from "react-icons/io5";
import { MdHeadset, MdHeadsetOff } from "react-icons/md";

interface WebSocketProps {
  sendMessage: (message: SockMessage) => void;
  endCall: () => void;
}

const ChatLayout = ({ sendMessage, endCall }: WebSocketProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [audioOn, setAudioOn] = useAtom(audioOnAtom);
  const [videoOn, setVideoOn] = useAtom(videoOnAtom);
  const [soundOn, setSoundOn] = useAtom(soundOnAtom);

  const userId = useAtomValue(userIdAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);

  const localStream = useAtomValue(localStreamAtom);
  const remoteStreams = useAtomValue(remoteStreamsAtom);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    remoteStreams.forEach((stream, index) => {
      const videoElement = remoteVideoRefs.current[index];
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, [remoteStreams]);

  useEffect(() => {
    const refs = remoteVideoRefs.current;
    return () => {
      refs.forEach((ref) => {
        if (ref) {
          ref.srcObject = null;
        }
      });
    };
  }, []);

  const handleExit = () => {
    if (!userId) return;

    sendMessage({
      chatroomId: curRoomId,
      senderId: userId,
      action: "LEAVE_ROOM",
      content: "",
    });
    endCall();
    setCurRoomId(0);
  };

  const handleAudioMute = () => {
    localStream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioOn((prev) => !prev);
    sendMessage({
      chatroomId: curRoomId,
      senderId: userId!,
      action: audioOn ? "MUTE" : "UNMUTE",
    });
  };

  const handleVideoMute = () => {
    localStream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideoOn((prev) => !prev);
    sendMessage({
      chatroomId: curRoomId,
      senderId: userId!,
      action: videoOn ? "TURN_ON_CAM" : "TURN_OFF_CAM",
    });
  };

  const handleSoundMute = () => setSoundOn((prev) => !prev);

  return (
    <div className="bg-gray-200 rounded-lg w-full flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between mt-8 mx-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl">디스고드 만들기#1</h1>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-white rounded-full py-2 px-4">
            <IoPerson color="gray" />
            <p className="text-gray-400">4</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <div className="flex flex-wrap gap-4 overflow-y-auto justify-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="h-64 rounded-xl transform scale-x-[-1]"
          ></video>
          {remoteStreams.map((_, index) => (
            <video
              key={index}
              ref={(el) => {
                remoteVideoRefs.current[index] = el;
              }}
              autoPlay
              className="h-64 rounded-xl transform scale-x-[-1]"
            ></video>
          ))}
        </div>
      </div>
      <div className="flex gap-8 justify-center">
        <div
          onClick={handleAudioMute}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          {audioOn ? <IoMic /> : <IoMicOff />}
        </div>
        <div
          onClick={handleVideoMute}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          {videoOn ? <IoVideocam /> : <IoVideocamOff />}
        </div>
        <div
          onClick={handleSoundMute}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          {soundOn ? <MdHeadset /> : <MdHeadsetOff />}
        </div>
        <div
          onClick={handleExit}
          className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <ImPhoneHangUp />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
