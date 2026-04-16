
import { useAuthStore } from "../../store/authStore";
import { useConversation } from "../../store/conversation";

export default function Conversations({ item }) {
  const { selectedConvo, setSelectedConvo } = useConversation();
  const { user, isLoading, error } = useAuthStore();

  const isSelected = selectedConvo?._id === item._id;

  return (
    <div
      onClick={() => setSelectedConvo(item)}
      className={`border-t flex items-center hover:bg-secondary gap-4 mt-2 px-3 pt-2 cursor-pointer ${isSelected ? "bg-secondary" : ""}`}
    >
      <div className="avatar border border-black avatar-online rounded-full">
        <div className="w-15  ">
          <img src={item.profilePic} />
        </div>
      </div>

      <div>{item.fullName}</div>
    </div>
  );
}
