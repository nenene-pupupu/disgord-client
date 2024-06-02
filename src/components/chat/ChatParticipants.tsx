import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { curRoomIdAtom, participantsAtom } from "@/atoms/WebSocketAtom";
import { useWebSocket } from "@/hooks/useWebSocket";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { sockClient } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { IoMic, IoMicOff, IoVideocam, IoVideocamOff } from "react-icons/io5";

const ChatParticipants = () => {
  const { addParticipant } = useWebSocket();
  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);
  const curRoomId = useAtomValue(curRoomIdAtom);
  const [participants, setParticipants] = useAtom(participantsAtom);

  useEffect(() => {
    const getParticipants = async () => {
      if (!token || !curRoomId) return;
      const res = await fetchWithAuth(
        token,
        `http://localhost:8080/chatrooms/${curRoomId}/join`,
        {
          method: "POST",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch participants");
      }
      const data: sockClient[] = await res.json();
      setParticipants(data);
    };
    try {
      addParticipant({ camOn: false, muted: true, userId: userId! });
    } catch (error) {
      console.log("Error adding participants:", error);
    }
    getParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, curRoomId]);

  const toggleMute = (index: number) => {
    setParticipants((prev) =>
      prev!.map((p, i) => (i === index ? { ...p, muted: !p.muted } : p)),
    );
  };
  const toggleCam = (index: number) => {
    setParticipants((prev) =>
      prev!.map((p, i) => (i === index ? { ...p, camOn: !p.camOn } : p)),
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2">Participants</h2>

      <div className="relative h-40 overflow-y-scroll">
        <div className="sticky top-0 bg-gradient-to-b from-white to-transparent h-2 w-full"></div>
        <div className="">
          <div className="flex flex-col gap-2">
            {participants &&
              participants.map((v, i) => (
                <div
                  key={i}
                  className={
                    "flex items-center w-full h-12 rounded-full gap-2 p-2 pr-4 " +
                    (i == 0 ? "bg-gray-100" : "")
                  }
                >
                  <div>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fyellow.svg?alt=media&token=b6a02ee0-a63a-4211-bf24-b30d2d3aeb1f"
                      }
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p>{v.userId}</p>
                  </div>
                  {v.muted ? (
                    <IoMicOff
                      onClick={() => toggleMute(i)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoMic
                      onClick={() => toggleMute(i)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  )}
                  {v.camOn ? (
                    <IoVideocam
                      onClick={() => toggleCam(i)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoVideocamOff
                      onClick={() => toggleCam(i)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent h-2 w-full"></div>
      </div>
    </div>
  );
};

export default ChatParticipants;
