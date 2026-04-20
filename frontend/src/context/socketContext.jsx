import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { SocketContext } from "./socket-context";
import { useAuthStore } from "../store/authStore";
import { SOCKET_URL } from "../lib/api";

export function SocketContextProvider({ children }) {
  const userId = useAuthStore((state) => state.user?._id);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const nextSocket = io(SOCKET_URL, {
      query: {
        userId,
      },
    });

    const handleConnect = () => {
      setSocket(nextSocket);
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocket(null);
      setIsSocketConnected(false);
      setOnlineUsers([]);
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    nextSocket.on("connect", handleConnect);
    nextSocket.on("disconnect", handleDisconnect);
    nextSocket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      nextSocket.off("connect", handleConnect);
      nextSocket.off("disconnect", handleDisconnect);
      nextSocket.off("getOnlineUsers", handleOnlineUsers);
      nextSocket.disconnect();
    };
  }, [userId]);

  const value = useMemo(
    () => ({
      socket,
      onlineUsers,
      isSocketConnected,
    }),
    [onlineUsers, isSocketConnected, socket],
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
