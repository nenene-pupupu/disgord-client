import { User } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/users/me`;

export const getUsersMe = async (token: string) => {
  const res = await fetchWithAuth(token, API_URL, {});
  if (!res.ok) {
    throw new Error("Failed to fetch me");
  }
  const data: User = await res.json();
  console.log(data);

  return data;
};

interface RequestBody {
  displayName: string;
  password?: string;
}

export const modUsersMe = async (
  token: string,
  displayName: string,
  password?: string,
) => {
  const body: RequestBody = { displayName: displayName };
  if (password != "") {
    body.password = password;
  }

  const res = await fetchWithAuth(token, API_URL, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status != 200) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data: User = await res.json();
  console.log(data);
};

export const delUsersMe = async (token: string, password: string) => {
  const res = await fetchWithAuth(token, API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (res.status != 204) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return true;
};
