import { createContext } from "react";

export const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
  isSocketConnected: false,
});
