import { useAuth } from "@/hooks/useAuth";
// import useFetchWithAuth from "@/hooks/useFetchWithAuth";
// import { User } from "@/types";
import ChatChat from "@components/chat/ChatChat";
import ChatEnter from "@components/chat/ChatEnter";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";
// import WebsocketTest from "@components/chat/WebsocketTest";
import { useState } from "react";

export default function Chat() {
  const { token } = useAuth();
  const [target, setTarget] = useState<number>(-1);
  // const fetchWithAuth = useFetchWithAuth();

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const res = await fetchWithAuth("http://localhost:8080/users");
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch");
  //       }
  //       const data: User[] = await res.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.log("error");
  //     }
  //   };
  //   getUsers();
  // }, []);

  return (
    <div className="flex flex-row gap-4 h-full">
      {/* <WebsocketTest /> */}
      <ChatRoomList target={target} setTarget={setTarget} />
      {token ? (
        target === -1 ? (
          <ChatEnter />
        ) : (
          <>
            <ChatLayout target={target} setTarget={setTarget} />
            <div className="flex flex-col gap-4 w-96 h-full mr-2">
              <ChatParticipants target={target} />
              <ChatChat target={target} />
            </div>
          </>
        )
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
