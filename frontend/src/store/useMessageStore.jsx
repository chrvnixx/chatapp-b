import { useEffect, useEffectEvent, useState } from "react";
import { useConversation } from "./conversation";
import { useSocket } from "../context/useSocket";
import { api } from "../lib/api";

export default function useMessageStore() {
  const selectedConvo = useConversation((state) => state.selectedConvo);
  const setMessages = useConversation((state) => state.setMessages);
  const appendMessage = useConversation((state) => state.appendMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { socket } = useSocket();

  async function sendMessage(message) {
    if (!selectedConvo?._id || !message.trim()) {
      return null;
    }

    try {
      setIsSending(true);
      setError(null);

      const res = await api.post(`/messages/send/${selectedConvo._id}`, {
        message,
      });

      appendMessage(res.data);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message ?? "Couldn't send your message.");
      throw error;
    } finally {
      setIsSending(false);
    }
  }

  const handleIncomingMessage = useEffectEvent((incomingMessage) => {
    if (!selectedConvo?._id) {
      return;
    }

    const belongsToActiveConversation =
      incomingMessage.senderId === selectedConvo._id ||
      incomingMessage.receiverId === selectedConvo._id;

    if (belongsToActiveConversation) {
      appendMessage(incomingMessage);
    }
  });

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("newMessage", handleIncomingMessage);

    return () => {
      socket.off("newMessage", handleIncomingMessage);
    };
  }, [socket]);

  useEffect(() => {
    async function getMessages() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await api.get(`/messages/${selectedConvo._id}`);

        setMessages(res.data);
      } catch (error) {
        setError(
          error.response?.data?.message ?? "Couldn't load this conversation.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedConvo?._id) {
      getMessages();
    } else {
      setMessages([]);
    }
  }, [selectedConvo?._id, setMessages]);

  return { sendMessage, isLoading, isSending, error };
}
