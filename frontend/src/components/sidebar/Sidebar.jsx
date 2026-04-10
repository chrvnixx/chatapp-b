import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function sideBar() {
  return (
    <div className=" px-4">
      
      <SearchInput />
      <div className="divider px-3">
      </div>
      <Conversations/>

      <LogoutButton/>
    </div>
  );
}
