import { useEffect, useState } from "react";
import { IoAdd, IoLockClosed, IoCreateOutline } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";
import Tooltip from "@components/common/Tooltip";
import Modal from "@components/common/Modal";
import {
  addChatroom,
  delChatroom,
  getChatrooms,
  modChatroom,
} from "@/services/chatService";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Chatroom } from "@/types";
import { IconSky } from "@/assets/svg";

const API_URL = "http://localhost:8080";

const ChatRoomList = () => {
  const { token, userId } = useAuth();
  const {
    curRoomId,
    targetRoomId,
    setCurRoomId,
    setTargetRoomId,
    sendMessage,
    startCall,
    endCall,
  } = useWebSocket();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [chatrooms, setChatrooms] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChatrooms = async () => {
    if (!token) return;
    try {
      const res: Chatroom[] = await getChatrooms(token);
      setChatrooms(res);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const joinRoom = async (chatroomId: number) => {
    const res = await fetch(`${API_URL}/chatrooms/${chatroomId}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Fail to join room 1");
    }
    const data = await res.json();
    console.log("[INFO] Joined room", data);
  };

  const handleEnter = async (id: number) => {
    if (!token || !userId) return;
    if (curRoomId !== 0) {
      sendMessage({
        chatroomId: curRoomId,
        senderId: userId,
        action: "LEAVE_ROOM",
        content: "",
      });
      endCall();
    }

    setCurRoomId(id);

    try {
      await startCall(); // Start the WebRTC call when entering the room

      await joinRoom(id);
    } catch (error) {
      console.error("Error in handleEnter", error);
    }
  };

  const handleCreate = async () => {
    if (!token) return;
    if (name.trim() === "") {
      alert("Enter channel name");
      return;
    }
    try {
      const res: Chatroom = await addChatroom(token, name, password);
      console.log(res);
      fetchChatrooms();
    } catch (error) {
      alert((error as Error).message);
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (!token || !targetRoomId) return;
    try {
      await delChatroom(token, targetRoomId);
      fetchChatrooms();
    } catch (error) {
      alert((error as Error).message);
    }
    handleClose();
  };

  const handleModify = async () => {
    if (!token || !targetRoomId) return;
    try {
      await modChatroom(token, targetRoomId, name, password);
      fetchChatrooms();
    } catch (error) {
      alert((error as Error).message);
    }
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setPassword("");
    setOpen(false);
  };

  const handleAddOpen = () => {
    setOpen(true);
    setType("add");
  };

  const handleModifyOpen = () => {
    setOpen(true);
    setType("modify");
  };

  return (
    <div className="flex flex-col">
      <Modal
        open={open}
        onClose={handleClose}
        title={type === "add" ? "Create New Channel" : "Modify Channel"}
        actions={
          type === "add"
            ? [
                {
                  text: "Create",
                  onClick: handleCreate,
                  className: "bg-blue-500 text-white hover:bg-blue-400 ml-3",
                },
                { text: "Cancel", onClick: handleClose },
              ]
            : [
                {
                  text: "Modify",
                  onClick: handleModify,
                  className: "bg-red-600 text-white hover:bg-red-500 ml-3",
                },
                { text: "Cancel", onClick: handleClose },
                {
                  text: "Channel Delete",
                  onClick: handleDelete,
                  className:
                    "border-none shadow-none font-normal text-gray-400 text-sm mr-auto underline",
                },
              ]
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Channel name
            </label>
            <div className="mt-2">
              <input
                name="id"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter channel name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex item-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (optional)"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
              />
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex mt-4 mb-2">
        <h2 className="text-2xl flex-auto">Channels</h2>
        <Tooltip message="Add Room">
          <button onClick={handleAddOpen}>
            <IoAdd className="h-8 w-8 text-gray-400" />
          </button>
        </Tooltip>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-scroll w-60"
      >
        {!chatrooms || chatrooms.length === 0 ? (
          <p className="text-gray-400">
            No channels here yet
            <br />
            Be the first to create one!
          </p>
        ) : (
          chatrooms.map((chatRoom) => (
            <li
              key={chatRoom.id}
              className={
                "flex items-center gap-x-4 py-5 px-2 rounded-md " +
                (curRoomId === chatRoom.id ? "bg-gray-100" : "")
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
                      setTargetRoomId(chatRoom.id);
                      setName(chatRoom.name);
                      handleModifyOpen();
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
