import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { audioOnAtom, videoOnAtom } from "@/atoms/ParticipantAtom";
import {
  chatroomsAtom,
  curRoomIdAtom,
  targetRoomIdAtom,
} from "@/atoms/WebSocketAtom";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { Chatroom } from "@/types";
import Modal from "@components/common/Modal";
import ProfileIcon from "@components/common/ProfileIcon";
import Tooltip from "@components/common/Tooltip";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { IoCreateOutline, IoLockClosed } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const API_URL = `http://${import.meta.env.VITE_SERVER_URL}`;

interface WebSocketProps {
  startCall: () => void;
  changeRoom: (newRoomId: number) => void;
  handleModifyOpen: (open: boolean, type: string, chatRoom: Chatroom) => void;
}

const ChatRoomList = ({
  changeRoom,
  startCall,
  handleModifyOpen,
}: WebSocketProps) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPwd, setWrongPwd] = useState(false);

  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userIdAtom);
  const chatrooms = useAtomValue(chatroomsAtom);

  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);
  const [targetRoomId, setTargetRoomId] = useAtom(targetRoomIdAtom);
  const audioOn = useAtomValue(audioOnAtom);
  const setVideoOn = useSetAtom(videoOnAtom);

  const navigator = useNavigate();

  const joinRoom = async (chatroomId: number) => {
    setVideoOn(false);
    const res = await fetchWithAuth(
      token!,
      `${API_URL}/chatrooms/${chatroomId}/join`,
      {
        method: "POST",
        body: JSON.stringify({
          camOn: false,
          muted: !audioOn,
          password: password != "" ? password : "",
        }),
      },
    );
    if (res && !res.ok) {
      console.error("Fail to join room", chatroomId);
      if (res && res.status == 403) {
        if (wrongPwd) {
          alert("Wrong password!");
          setPassword("");
        } else {
          setWrongPwd(true);
          handleOpen();
        }
      }
    } else {
      setCurRoomId(chatroomId);
      setWrongPwd(false);
      handleClose();
    }
  };

  const handleEnter = async (id: number) => {
    if (!token || !userId) {
      alert("Please login!");
      navigator("/login");
      return;
    }
    if (curRoomId !== 0) {
      await changeRoom(id);
    } else {
      // setCurRoomId(id);
      await startCall();
    }

    try {
      await joinRoom(id);
    } catch (error) {
      console.error("Error in handleEnter", error);
    }
  };

  const handleClose = () => {
    setPassword("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title="Enter Password"
        actions={[
          {
            text: "Enter",
            onClick: () => {
              handleEnter(targetRoomId);
              console.log(targetRoomId);
            },
            className: "bg-red-600 text-white hover:bg-red-500 ml-3",
          },
          {
            text: "Cancel",
            onClick: handleClose,
          },
        ]}
      >
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
              placeholder="Enter password"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
            />
          </div>
        </div>
      </Modal>
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
                <ProfileIcon
                  index={chatRoom.profileColorIndex}
                  className="h-10 w-10 flex-none rounded-lg bg-gray-50"
                />
                <div className="min-w-0 flex-auto flex items-center gap-2">
                  <p
                    className={
                      "text-sm font-semibold leading-6 text-gray-900 truncate"
                    }
                  >
                    {chatRoom.name}
                  </p>
                  {chatRoom.isPrivate && (
                    <IoLockClosed className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                {token && chatRoom.ownerId === userId && (
                  <button
                    onClick={() => {
                      setTargetRoomId(chatRoom.id);
                      handleModifyOpen(true, "modify", chatRoom);
                    }}
                  >
                    <IoCreateOutline className="h-6 w-6 text-gray-400 font-thin" />
                  </button>
                )}
                <Tooltip message="Enter Room">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTargetRoomId(chatRoom.id);
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
    </>
  );
};

export default ChatRoomList;
