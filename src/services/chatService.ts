// services/chatService.ts
import { tokenAtom } from "@/atoms/AuthAtom";
import { Chatroom } from "@/types/chatroom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "./fetchWithAuth";

export const useChatrooms = () => {
  const [data, setData] = useState<Chatroom[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useAtomValue(tokenAtom);

  useEffect(() => {
    const fetchChatrooms = async () => {
      if (token) {
        try {
          const res = await fetchWithAuth(
            token,
            `http://${import.meta.env.VITE_SERVER_URL}/chatrooms`,
          );
          if (res && res.ok) {
            const result = await res.json();
            setData(result);
          } else {
            throw new Error("Failed to fetch chatrooms");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChatrooms();
  }, [token]);

  return { data, error, loading };
};

export const getChatrooms = async () => {
  const res = await fetch(
    `http://${import.meta.env.VITE_SERVER_URL}/chatrooms`,
  );
  if (res.status != 200) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: Chatroom[] = await res.json();
  return data;
};

export const getChatroom = async (token: string, target: number) => {
  const res = await fetchWithAuth(
    token,
    `http://${import.meta.env.VITE_SERVER_URL}/chatrooms/${target}`,
  );
  if (res && res.status === 200) {
    const data: Chatroom = await res.json();
    return data;
  }
  throw new Error("Fail to get chatroom " + target);
};

export const addChatroom = async (
  token: string,
  name: string,
  password: string,
) => {
  try {
    const res = await fetchWithAuth(
      token,
      `http://${import.meta.env.VITE_SERVER_URL}/chatrooms`,
      {
        method: "POST",
        body: JSON.stringify({ name, password }),
      },
    );
    if (res && res.status === 201) {
      const data: Chatroom = await res.json();
      return data;
    } else {
      throw new Error("Fail to add chatroom");
    }
  } catch (err) {
    console.error(err);
  }
};

export const delChatroom = async (token: string, target: number) => {
  const res = await fetchWithAuth(
    token,
    `http://${import.meta.env.VITE_SERVER_URL}/chatrooms/${target}`,
    {
      method: "DELETE",
    },
  );
  if (res && res.status === 204) {
    return true;
  } else {
    throw new Error("Fail to delete chatroom");
  }
};

export const modChatroom = async (
  token: string,
  target: number,
  name: string,
  password: string,
) => {
  let res;

  if (password == "")
    res = await fetchWithAuth(
      token,
      `http://${import.meta.env.VITE_SERVER_URL}/chatrooms/${target}/public`,
      {
        method: "PATCH",
      },
    );
  else
    res = await fetchWithAuth(
      token,
      `http://${import.meta.env.VITE_SERVER_URL}/chatrooms/${target}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name,
          password,
        }),
      },
    );

  if (res && res.status === 200) {
    const data: Chatroom = await res.json();
    return data;
  }
  throw new Error("Failed to modify chatroom");
};
