import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiSend, FiWifi } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useSocket } from "../../context/useSocket";
import { useAuthStore } from "../../store/authStore";
import { useConversation } from "../../store/conversation";
import MessageSkeleton from "../MessageSkeleton";
import useMessageStore from "../../store/useMessageStore";
import Messages from "./Messages";

export default function MessageContainer() {
  const selectedConvo = useConversation((state) => state.selectedConvo);
  const messages = useConversation((state) => state.messages);
  const user = useAuthStore((state) => state.user);
  const [draftMessages, setDraftMessages] = useState({});
  const { sendMessage, isLoading, isSending, error } = useMessageStore();
  const lastMessageRef = useRef();
  const composerRef = useRef(null);
  const { onlineUsers } = useSocket();
  const conversationId = selectedConvo?._id ?? "__none__";
  const message = draftMessages[conversationId] ?? "";

  const isSelectedUserOnline = selectedConvo
    ? onlineUsers.includes(selectedConvo._id)
    : false;

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleMessageChange(e) {
    const nextValue = e.target.value;
    setDraftMessages((current) => ({
      ...current,
      [conversationId]: nextValue,
    }));

    e.target.style.height = "0px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 132)}px`;
  }

  function handleComposerKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  async function handleMessage(e) {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      await sendMessage(trimmedMessage);
      setDraftMessages((current) => ({
        ...current,
        [conversationId]: "",
      }));

      if (composerRef.current) {
        composerRef.current.style.height = "52px";
      }
    } catch (sendError) {
      console.log(sendError);
    }
  }

  if (!selectedConvo) {
    return (
      <section className="message-panel glass-card flex flex-col justify-between p-6 md:p-8">
        <div>
          <span className="section-chip">
            <HiOutlineSparkles size={14} />
            Ready when you are
          </span>
          <h2 className="panel-title mt-6 text-4xl">
            Welcome back, {user?.fullName}
          </h2>
          <p className="panel-subtitle mt-4 max-w-xl text-base">
            Pick a conversation from the sidebar to open the refreshed chat
            canvas. You&apos;ll see presence, cleaner message bubbles, and a
            smoother composer once a contact is selected.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="feature-card">
            <span className="section-chip">Live status</span>
            <p className="panel-subtitle mt-3 text-sm">
              Online contacts are marked instantly.
            </p>
          </article>
          <article className="feature-card">
            <span className="section-chip">Cleaner threads</span>
            <p className="panel-subtitle mt-3 text-sm">
              Messages now sit in a more polished reading layout.
            </p>
          </article>
          <article className="feature-card">
            <span className="section-chip">Focused writing</span>
            <p className="panel-subtitle mt-3 text-sm">
              Use the multiline composer for quick replies or longer notes.
            </p>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="message-panel glass-card flex h-full min-h-[82vh] flex-col overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(19,34,56,0.08)] px-5 py-5 md:px-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-[24px] border border-[rgba(19,34,56,0.08)] bg-white/90 p-1 shadow-[0_14px_28px_rgba(19,34,56,0.08)]">
              <img
                src={selectedConvo.profilePic}
                alt={`${selectedConvo.fullName} avatar`}
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
            <span
              className={`absolute -bottom-1 -right-1 status-dot ${isSelectedUserOnline ? "status-dot--online" : ""}`}
            />
          </div>

          <div>
            <span className="section-chip">Conversation</span>
            <h2 className="panel-title mt-3 text-2xl">
              {selectedConvo.fullName}
            </h2>
            <p className="panel-subtitle">
              {isSelectedUserOnline
                ? "Active now and ready to reply."
                : `Reach out to @${selectedConvo.username}.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[rgba(19,34,56,0.06)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">
          <FiWifi size={16} />
          {isSelectedUserOnline ? "Live" : "Away"}
        </div>
      </header>

      <div className="min-h-0 flex-1 p-4 md:p-6">
        <div className="message-scroll h-full rounded-[30px] border border-[rgba(19,34,56,0.08)] bg-[rgba(255,255,255,0.62)] p-4 md:p-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <MessageSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {!isLoading && messages.length === 0 ? (
            <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center">
              <span className="section-chip">First message</span>
              <h3 className="mt-5 text-2xl font-semibold text-[var(--ink)]">
                Start the conversation
              </h3>
              <p className="panel-subtitle mt-3 max-w-md text-sm">
                Send a quick hello to {selectedConvo.fullName} and this thread
                will come to life here.
              </p>
            </div>
          ) : null}

          {!isLoading && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((item) => (
                <div key={item._id} ref={lastMessageRef}>
                  <Messages item={item} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <footer className="px-4 pb-4 md:px-6 md:pb-6">
        {error ? (
          <div className="status-banner status-banner--error mb-3">{error}</div>
        ) : null}

        <form onSubmit={handleMessage} className="composer">
          <textarea
            key={selectedConvo._id}
            ref={composerRef}
            rows={1}
            maxLength={250}
            placeholder={`Write to ${selectedConvo.fullName}`}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleComposerKeyDown}
          />

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="text-xs font-semibold text-[var(--muted)]">
              {message.trim().length}/250
            </span>
            <button
              type="submit"
              className="primary-button min-w-[7.75rem] justify-center"
              disabled={isSending || !message.trim()}
            >
              {isSending ? (
                <span className="text-sm font-semibold">Sending...</span>
              ) : (
                <>
                  Send
                  <FiSend size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <p>Press Enter to send. Use Shift + Enter for a new line.</p>
          <span className="inline-flex items-center gap-1">
            <FiArrowUpRight size={14} />
            Polished for desktop and mobile
          </span>
        </div>
      </footer>
    </section>
  );
}
