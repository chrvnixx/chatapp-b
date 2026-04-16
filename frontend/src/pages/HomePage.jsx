import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Conversations from "../components/conversations/Conversations";
import { useAuthStore } from "../store/authStore";
import { TbLogout2 } from "react-icons/tb";
import MessageContainer from "../components/message/MessageContainer";

export default function HomePage() {
 
  const { conversations, user, isLoading, error } = useAuthStore();

  useEffect(() => {
    conversations();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className="card  bg-gray-400 flex flex-row gap-2 p-2 ">
        <div className="w-80">
          <div>
            <form className="flex justify-center">
              <input type="text" className="input" placeholder="search" />
              <button className="btn btn-secondary rounded-full">
                <CiSearch size={30} />
              </button>
            </form>
            <div className="mt-10 h-120 overflow-auto">
              {user?.map((item) => (
                <Conversations key={item._id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <TbLogout2 size={30} />
          </div>
        </div>
        <MessageContainer user={user} />
      </div>
    </div>
  );
}
