import { useSocket } from "../../context/useSocket";
import { useConversation } from "../../store/conversation";

export default function Conversations({ item }) {
  const selectedConvo = useConversation((state) => state.selectedConvo);
  const setSelectedConvo = useConversation((state) => state.setSelectedConvo);
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(item._id);
  const isSelected = selectedConvo?._id === item._id;

  function handleClick() {
    setSelectedConvo(item);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`conversation-button ${isSelected ? "conversation-button--active" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-14 w-14 overflow-hidden rounded-[20px] border border-[rgba(19,34,56,0.08)] bg-white/90 p-1">
            <img
              src={item.profilePic}
              alt={`${item.fullName} avatar`}
              className="h-full w-full rounded-[16px] object-cover"
            />
          </div>
          <span
            className={`absolute -bottom-1 -right-1 status-dot ${isOnline ? "status-dot--online" : ""}`}
          />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate font-semibold text-[var(--ink)]">
              {item.fullName}
            </p>
            <span className="text-xs font-semibold text-[var(--muted)]">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-[var(--muted)]">
            @{item.username}
          </p>
        </div>
      </div>
    </button>
  );
}
