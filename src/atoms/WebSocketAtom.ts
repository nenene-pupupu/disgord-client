import { SockMessage, SockClient } from "@/types";
import { atom } from "jotai";

export const curRoomIdAtom = atom<number>(0);

export const targetRoomIdAtom = atom<number>(0);

export const socketAtom = atom<WebSocket | null>(null);

export const messagesAtom = atom<SockMessage[]>([]);

export const participantsAtom = atom<SockClient[] | null>(null);

export const localStreamAtom = atom<MediaStream | null>(null);

export const remoteStreamsAtom = atom<MediaStream[]>([]);
