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
      <div
        className={`message-bubble ${myMessages ? "message-bubble--self" : ""}`}
      >
        <span
          className={`message-bubble__label ${myMessages ? "message-bubble__label--self" : ""}`}
        >
          {myMessages ? "You" : "Contact"}
        </span>
        <p className="whitespace-pre-wrap break-words text-sm leading-7">
          {item.message}
        </p>
        <time className="message-bubble__time" dateTime={item.createdAt}>
          {time}
        </time>
      </div>
    </article>
  );
}
