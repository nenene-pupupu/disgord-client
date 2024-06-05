// src/hooks/useAuth.ts

import { tokenAtom, userIdAtom } from "@/atoms/AuthAtom";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { User } from "@/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  const setTokenState = async (token: string | null) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      const res = await fetchWithAuth(
        token,
        `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/users/me`,
      );
      if (res && res.ok) {
        const me: User = await res.json();
        setUserIdState(me.id);
      }
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      setUserIdState(undefined);
    }
    setToken(token);
  };

  const setUserIdState = (id: number | undefined) => {
    if (id !== undefined) {
      localStorage.setItem("userId", id.toString());
    } else {
      localStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    if (token && userId === undefined) {
      (async () => {
        const res = await fetchWithAuth(
          token,
          `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/users/me`,
        );
        if (res && res.ok) {
          const me: User = await res.json();
          setUserIdState(me.id);
        }
      })();
    }
  }, [token, userId]);

  return { setTokenState, setUserIdState };

  // const value = { token, setToken, userId, setUserId };
  // const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth must be used within an AuthProvider");
  // }
  // return context;
};
