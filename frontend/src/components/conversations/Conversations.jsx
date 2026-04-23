import { useSocket } from "../../context/useSocket";
import { useConversation } from "../../store/conversation";

export default function Conversations({ item, onSelect }) {
  const selectedConvo = useConversation((state) => state.selectedConvo);
  const setSelectedConvo = useConversation((state) => state.setSelectedConvo);
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(item._id);
  const isSelected = selectedConvo?._id === item._id;
  const availabilityText = isOnline ? "Available to chat" : "Away right now";

  function handleClick() {
    setSelectedConvo(item);
    onSelect?.();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      aria-label={`Open conversation with ${item.fullName}`}
      className={`conversation-button ${isSelected ? "conversation-button--active" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="conversation-button__avatar">
            <img
              src={item.profilePic}
              alt={`${item.fullName} avatar`}
              className="h-full w-full rounded-[14px] object-cover"
            />
          </div>
          <span
            className={`absolute -bottom-1 -right-1 status-dot ${isOnline ? "status-dot--online" : ""}`}
          />
        </div>

        <div className="conversation-button__content text-left">
          <div className="conversation-button__meta">
            <p className="conversation-button__title truncate">
              {item.fullName}
            </p>
            <span
              className={`status-pill status-pill--tiny ${isOnline ? "status-pill--online" : ""}`}
            >
              {isOnline ? "Active now" : "Offline"}
            </span>
          </div>
          <div className="conversation-button__meta mt-1">
            <p className="conversation-button__username truncate">
              @{item.username}
            </p>
            <p className="conversation-button__presence">{availabilityText}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
