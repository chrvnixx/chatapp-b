import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useConversation } from "../../store/conversation";
import { useAuthStore } from "../../store/authStore";
import { IoIosChatbubbles } from "react-icons/io";
import useMessageStore from "../../store/useMessageStore";
import Messages from "./Messages";

export default function MessageContainer() {
  const { selectedConvo, messages } = useConversation();
  const { checkAuth, user } = useAuthStore();
  const [message, setMessage] = useState("");
  const { sendMessage } = useMessageStore();
  const lastMessageRef = useRef()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleMessage(e) {
    e.preventDefault();

    try {
      await sendMessage(message);

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  if (!selectedConvo) {
    return (
      <div className=" flex flex-col justify-center items-center bg-gray-200 text-2xl text-center w-150">
        Welcome {user.fullName} 🤲🏽, <br /> select a contact to start chatting😈
        <IoIosChatbubbles size={45} />
      </div>
    );
  }

  return (
    <div className=" bg-gray-200 flex flex-col p-2 w-150">
      <div className="bg-gray-400 w-full h-15 p-2">
        {selectedConvo?.fullName}
      </div>

      <div className="border h-120  overflow-y-auto px-2">
        {messages.length === 0 ? (
          <div className="flex justify-center text-gray-500">
            Start a conversation with {selectedConvo?.fullName}
          </div>
        ) : (
          <>
            {messages?.map((item) => (
              <div key={item._id} ref={lastMessageRef}>
                <Messages item={item} />
              </div>
            ))}
          </>
        )}
      </div>

      <form
        onSubmit={handleMessage}
        className="border rounded-full mt-2 flex justify-center items-center"
      >
        <input
          type="text"
          className="h-12 w-full text-gray-700 ml-4 outline-none "
          placeholder="Type a new message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="mr-1">
          <LuSendHorizontal
            size={30}
            className="text-primary active:scale-90"
          />
        </button>
      </form>
    </div>
  );
}
