import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

export default function MessageContainer() {
  return (
    <div className="md:w-100 flex lg:w-120  flex-col border-l relative border-white overflow-auto">
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2 fixed top-0 w-full z-2">
          <span className="label-text">To:</span>
          <span className="text-gray-900 font-bold">John doe</span>
        </div>

        <div className="mt-10">
          <Messages />
        </div>
        <div className="fixed bottom-0 transparent backdrop-blur-lg w-full ">
          <MessageInput />
        </div>
      </>
    </div>
  );
}
