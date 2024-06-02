import { IconSky } from "@/assets/svg";
import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { curRoomIdAtom, targetRoomIdAtom } from "@/atoms/WebSocketAtom";
import { useWebSocket } from "@/hooks/useWebSocket";
import {
  addChatroom,
  delChatroom,
  getChatrooms,
  modChatroom,
} from "@/services/chatService";
import { Chatroom } from "@/types";
import Modal from "@components/common/Modal";
import Tooltip from "@components/common/Tooltip";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { IoAdd, IoCreateOutline, IoLockClosed } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";

const ChatRoomList = () => {
  const { sendMessage } = useWebSocket();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [chatrooms, setChatrooms] = useState<Chatroom[] | null>(null);

  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);

  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const [targetRoomId, setTargetRoomId] = useAtom(targetRoomIdAtom);

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

  const handleEnter = async (id: number) => {
    console.log(token, userId, curRoomId);
    if (!token || !userId) return;
    if (curRoomId !== 0) {
      sendMessage({
        chatroomId: curRoomId,
        senderId: userId,
        action: "LEAVE_ROOM",
      });
    }
    setCurRoomId(id);

    console.log("joining", id);

    // try {
    //   const res = await fetchWithAuth(
    //     token,
    //     `http://localhost:8080/chatrooms/${id}/join`,
    //     {
    //       method: "POST",
    //     },
    //   );
    //   console.log("res", res);

    //   if (!res.ok) {
    //     console.log("err");
    //     return;
    //   }

    //   const data = await res.json();
    //   console.log("Enter data", data);
    //   // Fetch the messages for the new chatroom and update the state
    //   // const messagesRes = await fetchWithAuth(
    //   //   token,
    //   //   `http://localhost:8080/chats?chatroomId=${id}`,
    //   // );
    //   // if (messagesRes.ok) {
    //   //   const messages = await messagesRes.json();
    //   //   appendMessages(messages); // Assuming you have a function to append messages to the state
    //   // }
    // } catch (error) {
    //   console.error("Error in handleEnter", error);
    // }
    // const res = await fetchWithAuth(
    //   token,
    //   `http://localhost:8080/chatrooms/${id}/join`,
    //   {
    //     method: "POST",
    //   },
    // );
    // // console.log("res", res);
    // if (!res.ok) {
    //   console.log("err");
    //   return;
    // }
    // const data = await res.json();
    // console.log("Enter data", data);
  };

  const handleCreate = async () => {
    if (!token) return;
    if (name == "") {
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
    console.log();
    if (!token || !targetRoomId) return;
    try {
      await delChatroom(token, targetRoomId);
      fetchChatrooms();
      // alert("Deleted successfully");
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
      // alert("Modified successfully");
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
        title={type == "add" ? "Create New Channel" : "Modify Channel"}
        actions={
          type == "add"
            ? [
                {
                  text: "Create",
                  onClick: handleCreate,
                  className: "bg-blue-500 text-white hover:bg-blue-400 ml-3",
                },
                { text: "Cancle", onClick: handleClose },
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
                (curRoomId === chatRoom.id && "bg-gray-100")
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
