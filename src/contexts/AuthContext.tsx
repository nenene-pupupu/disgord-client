import { fetchWithAuth } from "@/services/fetchWithAuth";
import { User } from "@/types";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: number | undefined;
  setUserId: (id: number | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [userId, setUserIdState] = useState<number | undefined>(
    localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!, 10)
      : undefined,
  );

  const setToken = async (token: string | null) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      const res = await fetchWithAuth(token, "http://localhost:8080/users/me");
      const me: User = await res.json();
      setUserId(me.id);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      setUserId(undefined);
    }
    setTokenState(token);
  };

  const setUserId = (id: number | undefined) => {
    if (id !== undefined) {
      localStorage.setItem("userId", id.toString());
    } else {
      localStorage.removeItem("userId");
    }
    setUserIdState(id);
  };

  useEffect(() => {
    if (token && userId === undefined) {
      (async () => {
        const res = await fetchWithAuth(
          token,
          "http://localhost:8080/users/me",
        );
        const me: User = await res.json();
        setUserId(me.id);
      })();
    }
  }, [token, userId]);

  const value = { token, setToken, userId, setUserId };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
