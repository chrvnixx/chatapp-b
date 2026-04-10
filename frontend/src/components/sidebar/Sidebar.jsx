import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function sideBar() {
  return (
    <div className=" relative px-4 border-r w-70 border-white overflow-auto ">
      
      <div className="fixed top-4 ">
        <SearchInput />
      </div>
      <div className="divider px-3">
      </div>

     <div className=" mt-16">
       <Conversations/>
     </div>

     <div className="fixed bottom-0 p-4">
       <LogoutButton/>
     </div>
    </div>
  );
}
