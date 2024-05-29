import { useAuth } from "@/hooks/useAuth";
// import useFetchWithAuth from "@/hooks/useFetchWithAuth";
// import { User } from "@/types";
import ChatChat from "@components/chat/ChatChat";
import ChatLayout from "@components/chat/ChatLayout";
import ChatLogin from "@components/chat/ChatLogin";
import ChatParticipants from "@components/chat/ChatParticipants";
import ChatRoomList from "@components/chat/ChatRoomList";
// import { useEffect } from "react";

export default function Chat() {
  const { token } = useAuth();
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
      <ChatRoomList />
      {token ? (
        <>
          <ChatLayout />
          <div className="flex flex-col gap-4 w-96 h-full mr-2">
            <ChatParticipants />
            <ChatChat />
          </div>
        </>
      ) : (
        <ChatLogin />
      )}
    </div>
  );
}
