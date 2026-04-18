import { useEffect, useState } from "react";
import { useConversation } from "./conversation";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function useMessageStore() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedConvo, setMessages, messages } = useConversation();
  const api_url = "http://localhost:4000/api/messages";

  async function sendMessage(message) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${api_url}/send/${selectedConvo?._id}`, {
        message,
      });
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getMessages() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${api_url}/${selectedConvo?._id}`);

        setMessages([res.data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedConvo?._id) {
      getMessages();
    }
  }, [selectedConvo?._id, setMessages]);
  return { sendMessage, isLoading, };
}
