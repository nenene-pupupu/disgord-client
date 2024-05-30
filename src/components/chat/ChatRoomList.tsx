import { IconSky } from "@/assets/svg";
import { IoAdd, IoLockClosed } from "react-icons/io5";
import Tooltip from "@components/common/Tooltip";
import { useState } from "react";
import RoomModal from "./RoomModal";
import { MdChevronRight } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useChatrooms } from "@/services/chatService";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { useAuth } from "@/hooks/useAuth";

const ChatRoomList = ({
  target,
  setTarget,
}: {
  target?: number;
  setTarget: (target: number) => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");
  const { token } = useAuth();
  const { data: chatrooms } = useChatrooms();

  const handleEnter = async (id: number) => {
    if (!token) return;
    setTarget(id);
    const res = await fetchWithAuth(
      token,
      `http://localhost:8080/chatrooms/${id}/join`,
      {
        method: "POST",
      },
    );
    if (!res.ok) {
      console.log("err");
      return;
    }
    const data = await res.json();
    console.log("Enter data", data);
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="flex flex-col">
      <RoomModal
        target={target}
        type={type}
        open={openModal}
        setOpen={setOpenModal}
      />

      <div className="flex mt-4 mb-2">
        <h2 className="text-2xl flex-auto">Channels</h2>
        <Tooltip message="Add Room">
          <button
            onClick={() => {
              setType("add");
              setOpenModal(true);
            }}
          >
            <IoAdd className="h-8 w-8 text-gray-400" />
          </button>
        </Tooltip>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-scroll w-60"
      >
        {!chatrooms || chatrooms.length === 0 ? (
          <>
            <p className="text-gray-400">
              No channels here yet
              <br />
              Be the first to create one!
            </p>
          </>
        ) : (
          chatrooms.map((chatRoom) => (
            <li
              key={chatRoom.id}
              className={
                "flex items-center gap-x-4 py-5 px-2 rounded-md " +
                (target === chatRoom.id && "bg-gray-100")
              }
            >
              <div className="flex items-center w-40 gap-x-4">
                <img
                  className="h-10 w-10 flex-none rounded-lg bg-gray-50"
                  src={IconSky}
                  alt=""
                />
                <div className="min-w-0 flex-auto flex items-center gap-2">
                  <p
                    className={
                      "text-sm font-semibold leading-6 text-gray-900 truncate"
                    }
                  >
                    {chatRoom.name}
                  </p>
                  {chatRoom.password && (
                    <IoLockClosed className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                {chatRoom.ownerId && (
                  <button
                    onClick={() => {
                      setType("modify");
                      setTarget(chatRoom.id);
                      setOpenModal(true);
                    }}
                  >
                    <IoCreateOutline className="h-6 w-6 text-gray-400 font-thin" />
                  </button>
                )}
                <Tooltip message="Enter Room">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEnter(chatRoom.id);
                    }}
                  >
                    <MdChevronRight className="h-6 w-6 text-gray-400 font-thin" />
                  </button>
                </Tooltip>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatRoomList;
