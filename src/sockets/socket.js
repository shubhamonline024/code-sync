import { io } from "socket.io-client";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(baseURL, {
  transports: ["websocket"], // optional but recommended
});
