import { useAuthStore } from "../../store/authStore";

export default function Messages({ item }) {
  const userId = useAuthStore((state) => state.user?._id);
  const myMessages = userId === item.senderId;
  const time = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(item.createdAt));

  return (
    <article className={`message-row ${myMessages ? "message-row--self" : ""}`}>
      <div className={`message-bubble ${myMessages ? "message-bubble--self" : ""}`}>
        <p className="whitespace-pre-wrap break-words text-sm leading-7">
          {item.message}
        </p>
        <div
          className={`mt-3 flex items-center gap-2 text-[11px] font-semibold ${myMessages ? "justify-end text-white/82" : "text-[var(--muted)]"}`}
        >
          <span>{myMessages ? "You" : "Them"}</span>
          <span className="h-1 w-1 rounded-full bg-current/70" />
          <time dateTime={item.createdAt}>{time}</time>
        </div>
      </div>
    </article>
  );
}
