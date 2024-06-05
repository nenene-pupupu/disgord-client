import { User } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/users/me`;

export const getUsersMe = async (token: string | null) => {
  if (!token) {
    alert("Please log in!");
    window.location.href = "/login";
    return;
  }
  const res = await fetchWithAuth(token, API_URL, {});
  if (res && res.ok) {
    const data: User = await res.json();
    console.log(data);

    return data;
  } else {
    throw new Error("Failed to fetch me");
  }
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
  try {
    const res = await fetchWithAuth(token, API_URL, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    if (res && res.status == 200) {
      const data: User = await res.json();
      console.log(data);
    } else {
      throw new Error("Failed to modify profile");
    }
  } catch (err) {
    console.error(err);
  }
};

export const delUsersMe = async (token: string, password: string) => {
  try {
    const res = await fetchWithAuth(token, API_URL, {
      method: "DELETE",
      body: JSON.stringify({ password }),
    });
    if (res && res.status == 204) {
      return true;
    } else {
      throw new Error("Failed to delete account");
    }
  } catch (err) {
    console.error(err);
  }
};
