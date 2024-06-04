import { participantsAtom } from "@/atoms/WebSocketAtom";
// import ProfileIcon from "@components/common/ProfileIcon";
import { useAtomValue } from "jotai";
import { IoMic, IoMicOff, IoVideocam, IoVideocamOff } from "react-icons/io5";

const ChatParticipants = () => {
  const participants = useAtomValue(participantsAtom);

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
                    {/* <ProfileIcon
                      index={v.profileColorIndex}
                      className="w-8 h-8 rounded-full"
                    /> */}
                  </div>
                  <div className="flex-1">
                    <p>{v.userId}</p>
                  </div>
                  {v.muted ? (
                    <IoMicOff color="gray" className="cursor-pointer" />
                  ) : (
                    <IoMic color="gray" className="cursor-pointer" />
                  )}
                  {v.camOn ? (
                    <IoVideocam color="gray" className="cursor-pointer" />
                  ) : (
                    <IoVideocamOff color="gray" className="cursor-pointer" />
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
