import Logo from "@/assets/images/disgord.png";
import { IoExitOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import Tooltip from "@components/common/Tooltip";

const ChatRoomList = () => {
  const rooms = [
    {
      id: 1,
      icon: Logo,
      name: "room1",
    },
    {
      id: 2,
      icon: Logo,
      name: "room2",
    },
    {
      id: 3,
      icon: Logo,
      name: "room3",
    },
    {
      id: 4,
      icon: Logo,
      name: "room4",
    },
  ];

  return (
    <div>
      <div className="flex  mt-4">
        <h2 className="text-2xl flex-auto">Channels</h2>
        <Tooltip message="Add Room">
          <button>
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