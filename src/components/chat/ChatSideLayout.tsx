import { tokenAtom } from "@/atoms/AuthAtom";
import { targetRoomIdAtom } from "@/atoms/WebSocketAtom";
import {
  addChatroom,
  delChatroom,
  getChatrooms,
  modChatroom,
} from "@/services/chatService";
import { Chatroom } from "@/types";
import Modal from "@components/common/Modal";
import Tooltip from "@components/common/Tooltip";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import ChatRoomList from "./ChatRoomList";
import { useNavigate } from "react-router-dom";

interface WebSocketProps {
  startCall: () => void;
  changeRoom: (newRoomId: number) => void;
}

const ChatSideLayout = ({ changeRoom, startCall }: WebSocketProps) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [chatrooms, setChatrooms] = useState<Chatroom[] | null>(null);
  const token = useAtomValue(tokenAtom);
  const targetRoomId = useAtomValue(targetRoomIdAtom);
  const navigator = useNavigate();

  useEffect(() => {
    fetchChatrooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChatrooms = async () => {
    try {
      const res: Chatroom[] = await getChatrooms();
      setChatrooms(res);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleCreate = async () => {
    if (!token) {
      alert("Please login!");
      navigator("/login");
      return;
    }
    if (name.trim() === "") {
      alert("Enter channel name");
      return;
    }
    try {
      await addChatroom(token, name, password);
      fetchChatrooms();
    } catch (error) {
      alert((error as Error).message);
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (!token) {
      alert("Please login!");
      navigator("/login");
      return;
    }

    try {
      await delChatroom(token, targetRoomId);
      fetchChatrooms();
    } catch (error) {
      alert((error as Error).message);
    }
    handleClose();
  };

  const handleModify = async () => {
    if (!token) {
      alert("Please login!");
      navigator("/login");
      return;
    }
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

  const handleModifyOpen = (
    open: boolean,
    type: string,
    chatRoom: Chatroom,
  ) => {
    setOpen(open);
    setType(type);
    setName(chatRoom.name);
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
        {token && (
          <Tooltip message="Add Room">
            <button onClick={handleAddOpen}>
              <IoAdd className="h-8 w-8 text-gray-400" />
            </button>
          </Tooltip>
        )}
      </div>

      <ChatRoomList
        startCall={startCall}
        changeRoom={changeRoom}
        chatrooms={chatrooms}
        handleModifyOpen={handleModifyOpen}
      />
    </div>
  );
};

export default ChatSideLayout;
