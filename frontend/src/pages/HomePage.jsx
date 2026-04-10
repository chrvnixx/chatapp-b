import React from "react";
import Sidebar from "../components/sidebar/Sidebar"
import MessageContainer from "../components/messages/MessageContainer";

export default function Homepage() {
  return (
    <div className="flex sm:h-112.5 md:h-137.5  rounded-lg overflow-hidden bg-gray-400/0 backdrop-blur-3xl ">
      <Sidebar />
      
      
      <MessageContainer/>
  
    </div>
  );
}
