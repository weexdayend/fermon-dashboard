"use client";

import { io } from "socket.io-client";

export const socket = io('https://socket.synchronice.id', {
    transports: ['websocket'],
    withCredentials: true,
});