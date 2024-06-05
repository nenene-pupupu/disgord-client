import { participantsAtom } from "@/atoms/WebSocketAtom";
import ProfileIcon from "@components/common/ProfileIcon";
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
              participants?.map((v, i) => (
                <div
                  key={i}
                  className={
                    "flex items-center w-full h-12 rounded-full gap-2 p-2 pr-4 " +
                    (i == 0 ? "bg-gray-100" : "")
                  }
                >
                  <div>
                    <ProfileIcon
                      index={v.profileColorIndex}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p>{v.displayName}</p>
                  </div>
                  {v.muted ? <IoMicOff color="gray" /> : <IoMic color="gray" />}
                  {v.camOn ? (
                    <IoVideocam color="gray" />
                  ) : (
                    <IoVideocamOff color="gray" />
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
