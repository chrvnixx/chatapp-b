import React from "react";
import Sidebar from "../components/sidebar/Sidebar"
import MessageContainer from "../components/messages/MessageContainer";
import { MessagesSquare } from "lucide-react";

export default function Homepage() {
  const selectedChat = true
  return (
    <div className="flex h-150 my-auto rounded-lg overflow-hidden bg-orange-400/10 p-4  backdrop-blur-lg ">
      <Sidebar />
      
      {selectedChat ? <div className="flex flex-col justify-center items-center pr-4 ml-4">
        <p className="text-lg">Welcome🙏 John Doe😈</p>
        <p className="text-xl">Select a chat to start messaging</p>
        <div>
          <MessagesSquare size={40} />
        </div>
      </div> :  <MessageContainer/> }
     
  
    </div>
  );
}
