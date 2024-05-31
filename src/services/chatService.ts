// services/chatService.ts
import { fetchWithAuth } from "./fetchWithAuth";
import { Chatroom } from "@/types/chatroom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export const useChatrooms = () => {
  const { token } = useAuth();
  const [data, setData] = useState<Chatroom[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChatrooms = async () => {
      if (token) {
        try {
          const response = await fetchWithAuth(
            token,
            "http://localhost:8080/chatrooms",
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

export const getChatrooms = async (token: string) => {
  const res = await fetchWithAuth(token, "http://localhost:8080/chatrooms");
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
  const res = await fetchWithAuth(token, "http://localhost:8080/chatrooms", {
    method: "POST",
    body: JSON.stringify({ name, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
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
    `http://localhost:8080/chatrooms/${target}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
    `http://localhost:8080/chatrooms/${target}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        name,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (res.status != 200) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: Chatroom = await res.json();
  return data;
};
