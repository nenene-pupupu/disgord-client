import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { audioOnAtom, soundOnAtom, videoOnAtom } from "@/atoms/ParticipantAtom";
import {
  curRoomIdAtom,
  localStreamAtom,
  participantsAtom,
  remoteStreamsAtom,
} from "@/atoms/WebSocketAtom";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { SockMessage } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import {
  IoMic,
  IoMicOff,
  IoPerson,
  IoVideocam,
  IoVideocamOff,
  IoVideocamOffOutline,
} from "react-icons/io5";
import { MdHeadset, MdHeadsetOff } from "react-icons/md";

interface WebSocketProps {
  sendMessage: (message: SockMessage) => void;
  endCall: () => void;
}

const ChatLayout = ({ sendMessage, endCall }: WebSocketProps) => {
  const [roomName, setRoomName] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [audioOn, setAudioOn] = useAtom(audioOnAtom);
  const [videoOn, setVideoOn] = useAtom(videoOnAtom);
  const [soundOn, setSoundOn] = useAtom(soundOnAtom);

  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const participants = useAtomValue(participantsAtom);
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

  useEffect(() => {
    if (!token) return;
    const getRoomInfo = async () => {
      const res = await fetchWithAuth(
        token,
        `http://${import.meta.env.VITE_SERVER_URL}/chatrooms/${curRoomId}`,
      );
      const data = await res?.json();
      setRoomName(data.name);
    };
    getRoomInfo();
  }, [curRoomId]);

  useEffect(() => {
    if (localStream) {
      toggleTrackState(localStream.getAudioTracks(), audioOn);
    }
    sendActionMessage(audioOn ? "UNMUTE" : "MUTE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioOn]);

  useEffect(() => {
    if (localStream) {
      toggleTrackState(localStream.getVideoTracks(), videoOn);
    }
    sendActionMessage(videoOn ? "TURN_ON_CAM" : "TURN_OFF_CAM");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoOn]);

  const handleExit = () => {
    if (!userId) return;

    sendMessage({
      action: "LEAVE_ROOM",
      content: "",
    });
    endCall();
    setCurRoomId(0);
  };

  const toggleTrackState = (tracks: MediaStreamTrack[], enabled: boolean) => {
    tracks.forEach((track) => (track.enabled = enabled));
  };

  const sendActionMessage = (action: string) => {
    sendMessage({
      action,
    });
  };

  const handleAudioMute = () => {
    setAudioOn((prev) => !prev);
  };

  const handleVideoMute = () => {
    setVideoOn((prev) => !prev);
  };

  const toggleRemoteAudio = (enabled: boolean) => {
    remoteStreams.forEach((stream) => {
      toggleTrackState(stream.getAudioTracks(), enabled);
    });
  };

  const handleSoundMute = () => {
    const newSoundOn = !soundOn;
    // toggleTrackState(localStream?.getAudioTracks() || [], newSoundOn);
    // toggleTrackState(localStream?.getVideoTracks() || [], newSoundOn);
    toggleRemoteAudio(newSoundOn);
    setSoundOn(newSoundOn);
    // setAudioOn(newSoundOn);
    // setVideoOn(newSoundOn);
  };

  const getGridTemplate = (numParticipants: number) => {
    if (numParticipants === 1) return "1fr";
    if (numParticipants === 2) return "1fr 1fr";
    if (numParticipants <= 4) return "1fr 1fr";
    if (numParticipants <= 6) return "1fr 1fr 1fr";
    return "1fr 1fr 1fr 1fr";
  };

  const participantsCount = 1 + remoteStreams.length;

  return (
    <div className="bg-gray-200 rounded-lg w-full flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between mt-8 mx-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl">{roomName}</h1>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-white rounded-full py-2 px-4">
            <IoPerson color="gray" />
            <p className="text-gray-400">{participantsCount}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <div
          className={`grid gap-4 justify-center w-full px-8 ${
            participantsCount === 1 ? "place-items-center" : ""
          }`}
          style={{
            gridTemplateColumns: getGridTemplate(participantsCount),
          }}
        >
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className={`w-full h-full rounded-xl transform scale-x-[-1] object-cover ${
                participantsCount === 1 ? "w-3/4 h-3/4" : "w-full h-full"
              }`}
            ></video>
            {!videoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <IoVideocamOffOutline className="text-white text-5xl" />
              </div>
            )}
            <div className="absolute bottom-0 right-2 w-full text-white p-2 text-right rounded-b-xl">
              You
            </div>
          </div>
          {remoteStreams.map((stream, idx) => {
            const streamId = stream.id;
            const participant = participants?.find(
              (p) => p.streamId === streamId,
            );
            console.log(idx, streamId);
            return (
              <div key={streamId} className="relative">
                <video
                  ref={(el) => {
                    remoteVideoRefs.current[idx] = el;
                  }}
                  autoPlay
                  className="w-full h-full rounded-xl transform scale-x-[-1] object-cover bg-gray-400"
                ></video>
                {participant && !participant.camOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <IoVideocamOffOutline className="text-white text-5xl" />
                  </div>
                )}
                {participant && (
                  <div className="absolute bottom-0 right-2 w-full text-white p-2 text-right rounded-b-xl">
                    {participant.displayName}
                  </div>
                )}
              </div>
            );
          })}
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
