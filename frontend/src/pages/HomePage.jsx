import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Conversations from "../components/conversations/Conversations";
import { useAuthStore } from "../store/authStore";
import { TbLogout2 } from "react-icons/tb";
import MessageContainer from "../components/message/MessageContainer";
import toast from "../../node_modules/react-hot-toast/src/index";
import { useConversation } from "../store/conversation";

export default function HomePage() {
  const { conversations, getConversations, logout, isLoading, error } =
    useAuthStore();
  const [search, setSearch] = useState("");
  const { setSelectedConvo } = useConversation();

  useEffect(() => {
    getConversations();
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!search) {
      return toast.error("No input!");
    }
    if (search.length < 3) {
      return toast.error("input must be at least 3 characters");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      setSelectedConvo(conversation);
      setSearch("");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className="card  bg-gray-400 flex flex-row gap-2 p-2 ">
        <div className="w-80">
          <div>
            <form onSubmit={handleSearch} className="flex justify-center">
              <input
                type="text"
                className="input"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-secondary rounded-full">
                <CiSearch size={30} />
              </button>
            </form>
            <div className="mt-10 h-120 overflow-auto">
              {conversations?.map((item) => (
                <Conversations key={item._id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-4 ">
            <TbLogout2
              onClick={handleLogout}
              size={30}
              className="hover:scale-105 active:scale-100"
            />
          </div>
        </div>
        <MessageContainer />
      </div>
    </div>
  );
}
