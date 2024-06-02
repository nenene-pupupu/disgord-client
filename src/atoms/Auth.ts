import { atom } from "jotai";

export const tokenAtom = atom<string | null>(
  localStorage.getItem("accessToken"),
);

export const userIdAtom = atom<number | undefined>(
  localStorage.getItem("userId")
    ? parseInt(localStorage.getItem("userId")!, 10)
    : undefined,
);
