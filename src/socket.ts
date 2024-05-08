"use client";

import { io } from "socket.io-client";

export const socket = io('https://socket.greatjbb.com', {
    transports: ['websocket'],
    withCredentials: true,
});