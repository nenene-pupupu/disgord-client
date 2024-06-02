import { SockMessage, sockClient } from "@/types";
import { atom } from "jotai";

export const curRoomIdAtom = atom<number>(0);

export const targetRoomIdAtom = atom<number>(0);

export const socketAtom = atom<WebSocket | null>(null);

export const messagesAtom = atom<SockMessage[]>([]);

export const participantsAtom = atom<sockClient[] | null>(null);
