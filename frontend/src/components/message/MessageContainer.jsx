import { useEffect, useRef, useState } from "react";
import {
  FiClock,
  FiMenu,
  FiMessageSquare,
  FiSend,
  FiWifi,
} from "react-icons/fi";
import { useSocket } from "../../context/useSocket";
import { useConversation } from "../../store/conversation";
import MessageSkeleton from "../MessageSkeleton";
import useMessageStore from "../../store/useMessageStore";
import Messages from "./Messages";
import { CiChat1 } from "react-icons/ci";

export default function MessageContainer({
  onOpenSidebar,
  showSidebarToggle = false,
}) {
  const selectedConvo = useConversation((state) => state.selectedConvo);
  const messages = useConversation((state) => state.messages);
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
  const compactBarTitle = selectedConvo ? selectedConvo.fullName : "Inbox";
  const compactBarSubtitle = selectedConvo
    ? isSelectedUserOnline
      ? "Online now"
      : "Currently offline"
    : "Open your contacts";

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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
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
        composerRef.current.style.height = "56px";
      }
    } catch (sendError) {
      console.log(sendError);
    }
  }

  if (!selectedConvo) {
    return (
      <section className="message-panel glass-card empty-panel flex h-full flex-col overflow-hidden">
        {showSidebarToggle ? (
          <div className="compact-chat-topbar">
            <button
              type="button"
              className="icon-button"
              onClick={onOpenSidebar}
              aria-label="Open contacts"
            >
              <FiMenu size={18} />
            </button>
            <div className="min-w-0">
              <p className="compact-chat-topbar__eyebrow">{compactBarSubtitle}</p>
              <h2 className="compact-chat-topbar__title truncate">
                {compactBarTitle}
              </h2>
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 items-center justify-center p-6 md:p-8">
          <div className="max-w-xl text-center">
            <div className="mt-6">
              <span className="section-chip">
                <CiChat1 size={50} />
              </span>
            </div>
            <h2 className="panel-title mt-6 text-4xl">
              Choose a conversation to start chatting
            </h2>
            <p className="panel-subtitle mt-4 text-base">
              Pick a contact from the sidebar and keep the conversation moving.
            </p>
            {/* <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <article className="info-tile">
              <h3>Presence-aware inbox</h3>
              <p>See who is available before you open a thread.</p>
            </article>
            <article className="info-tile">
              <h3>Fast composer</h3>
              <p>
                Use Enter to send, or Shift + Enter when you need a new line.
              </p>
            </article>
          </div> */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="message-panel glass-card flex h-full flex-col overflow-hidden">
      {showSidebarToggle ? (
        <div className="compact-chat-topbar">
          <button
            type="button"
            className="icon-button"
            onClick={onOpenSidebar}
            aria-label="Open contacts"
          >
            <FiMenu size={18} />
          </button>
          <div className="min-w-0">
            <p className="compact-chat-topbar__eyebrow">{compactBarSubtitle}</p>
            <h2 className="compact-chat-topbar__title truncate">
              {compactBarTitle}
            </h2>
          </div>
        </div>
      ) : null}

      <header className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="message-header-avatar">
              <img
                src={selectedConvo.profilePic}
                alt={`${selectedConvo.fullName} avatar`}
                className="h-full w-full rounded-[16px] object-cover"
              />
            </div>
            <span
              className={`absolute -bottom-1 -right-1 status-dot ${isSelectedUserOnline ? "status-dot--online" : ""}`}
            />
          </div>

          <div>
            <span className="section-chip">Active conversation</span>
            <h2 className="panel-title mt-3 text-2xl">
              {selectedConvo.fullName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
              <span>@{selectedConvo.username}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--stroke-strong)]" />
              <span>
                {isSelectedUserOnline ? "Online now" : "Currently offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="count-badge">
            {messages.length} {messages.length === 1 ? "message" : "messages"}
          </span>
          <span
            className={`status-pill ${isSelectedUserOnline ? "status-pill--online" : ""}`}
          >
            <FiWifi size={16} />
            {isSelectedUserOnline ? "Online" : "Offline"}
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 p-4 md:p-6">
        <div className="message-scroll message-thread h-full">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <MessageSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {!isLoading && messages.length === 0 ? (
            <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center">
              <div className="empty-panel__icon">
                <FiMessageSquare size={18} />
              </div>
              <span className="section-chip mt-6">No messages yet</span>
              <h3 className="mt-5 text-2xl font-semibold text-[var(--ink)]">
                Start a conversation
              </h3>
              <p className="panel-subtitle mt-3 max-w-md text-sm">
                Send a first message to {selectedConvo.fullName} and the full
                conversation will appear here.
              </p>
            </div>
          ) : null}

          {!isLoading && messages.length > 0 ? (
            <div className="flex flex-col gap-4">
              <span className="thread-day-label">Conversation synced</span>
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
          <div className="min-w-0 flex-1">
            <textarea
              key={selectedConvo._id}
              ref={composerRef}
              rows={1}
              maxLength={250}
              placeholder={`Message ${selectedConvo.fullName}`}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleComposerKeyDown}
              aria-label={`Message ${selectedConvo.fullName}`}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[var(--muted)]">
              <span className="inline-flex items-center gap-2">
                <FiClock size={14} />
                Press Enter to send. Use Shift + Enter for a new line.
              </span>
              <span>{message.trim().length}/250</span>
            </div>
          </div>

          <div className="composer__aside shrink-0">
            <span
              className={`status-pill ${isSelectedUserOnline ? "status-pill--online" : ""}`}
            >
              <FiWifi size={14} />
              {isSelectedUserOnline ? "Live" : "Offline"}
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
      </footer>
    </section>
  );
}
