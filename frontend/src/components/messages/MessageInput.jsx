import { SendHorizontal } from "lucide-react";
import React from "react";

export default function MessageInput() {
  return (
    <form className=" px-2 my-3  ">
      <div className="w-95 flex ">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="send a message"
        />
        <button
          type="submit"
          className="btn rounded-full w-11"
        >
          <SendHorizontal className="scale-200" />
          
        </button>
      </div>
    </form>
  );
}
