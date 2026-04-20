import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { FiLogOut, FiSearch, FiUsers, FiWifi } from "react-icons/fi";
import Conversations from "../components/conversations/Conversations";
import MessageContainer from "../components/message/MessageContainer";
import { useSocket } from "../context/useSocket";
import { useAuthStore } from "../store/authStore";
import { useConversation } from "../store/conversation";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const conversations = useAuthStore((state) => state.conversations);
  const getConversations = useAuthStore((state) => state.getConversations);
  const logout = useAuthStore((state) => state.logout);
  const isFetchingConversations = useAuthStore(
    (state) => state.isFetchingConversations,
  );
  const error = useAuthStore((state) => state.error);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const deferredSearch = useDeferredValue(search);
  const resetConversation = useConversation((state) => state.resetConversation);
  const { onlineUsers, isSocketConnected } = useSocket();

  useEffect(() => {
    getConversations().catch(() => null);
  }, [getConversations]);

  const onlineCount = useMemo(
    () =>
      conversations.filter((conversation) => onlineUsers.includes(conversation._id))
        .length,
    [conversations, onlineUsers],
  );

  const filteredConversations = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const matchesSearch =
        !normalizedSearch ||
        conversation.fullName.toLowerCase().includes(normalizedSearch) ||
        conversation.username.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        activeFilter === "online"
          ? onlineUsers.includes(conversation._id)
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, conversations, deferredSearch, onlineUsers]);

  async function handleLogout() {
    try {
      await logout();
      resetConversation();
    } catch (logoutError) {
      console.log(logoutError);
    }
  }

  return (
    <div className="page-shell">
      <div className="chat-shell">
        <aside className="sidebar-panel glass-card flex flex-col gap-6 p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-[24px] border border-[rgba(19,34,56,0.08)] bg-white/80 p-1 shadow-[0_14px_28px_rgba(19,34,56,0.08)]">
                <img
                  src={user?.profilePic}
                  alt={`${user?.fullName} avatar`}
                  className="h-full w-full rounded-[20px] object-cover"
                />
              </div>
              <div>
                <span className="section-chip">Your desk</span>
                <h1 className="panel-title mt-3 text-2xl">{user?.fullName}</h1>
                <p className="panel-subtitle">@{user?.username}</p>
              </div>
            </div>

            <button
              type="button"
              className="icon-button"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <FiLogOut size={18} />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <article className="mini-stat">
              <span>Contacts</span>
              <strong>{conversations.length}</strong>
            </article>
            <article className="mini-stat">
              <span>Online</span>
              <strong>{onlineCount}</strong>
            </article>
            <article className="mini-stat">
              <span>Socket</span>
              <strong>{isSocketConnected ? "Live" : "Sync"}</strong>
            </article>
          </div>

          <label className="field-shell">
            <span className="field-label">Search people</span>
            <div className="flex items-center gap-3">
              <FiSearch className="text-[var(--muted)]" size={18} />
              <input
                type="text"
                className="field-input"
                placeholder="Search by name or username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`filter-pill ${activeFilter === "all" ? "filter-pill--active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <FiUsers size={14} />
              All contacts
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === "online" ? "filter-pill--active" : ""}`}
              onClick={() => setActiveFilter("online")}
            >
              <FiWifi size={14} />
              Online only
            </button>
          </div>

          {error ? (
            <div className="status-banner status-banner--error">{error}</div>
          ) : null}

          <div className="min-h-0 flex-1">
            <div className="mb-3 flex items-center justify-between">
              <span className="section-chip">Conversations</span>
              <span className="text-sm text-[var(--muted)]">
                {filteredConversations.length} visible
              </span>
            </div>

            <div className="message-scroll flex h-full flex-col gap-3 pr-1">
              {isFetchingConversations
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-[24px] border border-[rgba(19,34,56,0.08)] bg-white/72 p-4"
                    >
                      <div className="flex animate-pulse items-center gap-3">
                        <div className="h-14 w-14 rounded-[20px] bg-[rgba(19,34,56,0.08)]" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 rounded-full bg-[rgba(19,34,56,0.08)]" />
                          <div className="h-3 w-24 rounded-full bg-[rgba(19,34,56,0.06)]" />
                        </div>
                      </div>
                    </div>
                  ))
                : null}

              {!isFetchingConversations &&
              filteredConversations.length > 0
                ? filteredConversations.map((item) => (
                    <Conversations key={item._id} item={item} />
                  ))
                : null}

              {!isFetchingConversations && filteredConversations.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-[rgba(19,34,56,0.12)] bg-white/55 p-6 text-center">
                  <p className="font-semibold text-[var(--ink)]">
                    No matches right now
                  </p>
                  <p className="panel-subtitle mt-2 text-sm">
                    Try a different search or switch back to all contacts.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="insight-card">
            <span className="section-chip">Tip</span>
            <p className="panel-subtitle mt-3 text-sm">
              Search updates live, and online-only mode helps you focus on
              people who can reply immediately.
            </p>
          </div>
        </aside>

        <div className="min-h-0">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
}
