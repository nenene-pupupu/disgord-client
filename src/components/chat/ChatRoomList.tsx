import { IconSky } from "@/assets/svg";
import { IoExitOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import Tooltip from "@components/common/Tooltip";
import { useState } from "react";
import AddRoom from "./AddRoom";

const rooms = [
  {
    id: 1,
    icon: IconSky,
    name: "room1",
  },
  {
    id: 2,
    icon: IconSky,
    name: "room2",
  },
  {
    id: 3,
    icon: IconSky,
    name: "room3",
  },
  {
    id: 4,
    icon: IconSky,
    name: "room4",
  },
];

const ChatRoomList = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <AddRoom open={modal} setOpen={setModal} />

      <div className="flex  mt-4">
        <h2 className="text-2xl flex-auto">Channels</h2>
        <Tooltip message="Add Room">
          <button onClick={() => setModal(true)}>
            <IoAdd className="h-8 w-8 text-gray-400" />
          </button>
        </Tooltip>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {rooms.map((chatRoom) => (
          <li key={chatRoom.id} className="flex items-center gap-x-4 py-5">
            <div className="flex items-center w-40 gap-x-4">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={chatRoom.icon}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {chatRoom.name}
                </p>
              </div>
            </div>
            <Tooltip message="Enter Room">
              <button>
                <IoExitOutline className="h-6 w-6 text-gray-400" />
              </button>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
