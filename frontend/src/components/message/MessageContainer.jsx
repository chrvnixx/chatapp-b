import React from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useConversation } from "../../store/conversation";

export default function MessageContainer() {
  const { selectedConvo, setSelectedConvo } = useConversation();

  return (
    <div className=" bg-gray-200 flex flex-col p-2 w-150">
      <div className="bg-gray-400 w-full h-15 p-2">
        {selectedConvo?.fullName}
      </div>

      <div className="border h-120 overflow-auto">
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </div>

      <form className="border rounded-full mt-2 flex justify-center items-center">
        <input
          type="text"
          className="h-12 w-full text-gray-700 ml-4 outline-none "
          placeholder="Type a new message"
        />
        <div className="mr-1">
          <LuSendHorizontal size={30} className="text-primary" />
        </div>
      </form>
    </div>
  );
}
