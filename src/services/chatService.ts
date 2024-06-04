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
          const response = await fetchWithAuth(
            token,
            `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch chatrooms");
          }
          const result = await response.json();
          setData(result);
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
    `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms`,
  );

  // const res = await fetchWithAuth(
  //   token,
  //   `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms`,
  // );
  if (res.status != 200) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: Chatroom[] = await res.json();
  return data;
};

export const addChatroom = async (
  token: string,
  name: string,
  password: string,
) => {
  const res = await fetchWithAuth(
    token,
    `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms`,
    {
      method: "POST",
      body: JSON.stringify({ name, password }),
    },
  );
  if (res.status != 201) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: Chatroom = await res.json();
  return data;
};

export const delChatroom = async (token: string, target: number) => {
  const res = await fetchWithAuth(
    token,
    `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms/${target}`,
    {
      method: "DELETE",
    },
  );
  if (res.status != 204) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return true;
};

export const modChatroom = async (
  token: string,
  target: number,
  name: string,
  password: string,
) => {
  const res = await fetchWithAuth(
    token,
    `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/chatrooms/${target}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        name,
        password,
      }),
    },
  );
  if (res.status != 200) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: Chatroom = await res.json();
  return data;
};
