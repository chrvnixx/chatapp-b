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
  const { onlineUsers } = useSocket();

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
    <div className="chat-page-shell">
      <div className="chat-shell">
        <aside className="sidebar-panel glass-card flex flex-col gap-4 p-4 md:p-5">
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <span className="brand-badge">
                <FiWifi size={14} />
                LockIn Chat
              </span>
              <button
                type="button"
                className="icon-button"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <FiLogOut size={18} />
              </button>
            </div>

            <section className="user-card user-card--compact">
              <div className="user-card__avatar">
                <img
                  src={user?.profilePic}
                  alt={`${user?.fullName} avatar`}
                  className="h-full w-full rounded-[16px] object-cover"
                />
              </div>

              <div className="user-card__meta min-w-0 flex-1">
                <div className="user-card__heading">
                  <div className="min-w-0">
                    <p className="user-card__eyebrow">Workspace profile</p>
                    <h1 className="truncate">{user?.fullName}</h1>
                  </div>
                  <span className="status-pill status-pill--online">
                    Signed in
                  </span>
                </div>

                <div className="user-card__footer">
                  <span className="user-card__handle truncate">
                    @{user?.username}
                  </span>
                  <div className="user-card__stats">
                    <span className="mini-stat-pill">
                      <strong>{conversations.length}</strong>
                      contacts
                    </span>
                    <span className="mini-stat-pill mini-stat-pill--online">
                      <strong>{onlineCount}</strong>
                      online
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="sidebar-toolbar">
              <label className="field-shell field-shell--inline">
                <FiSearch className="sidebar-search-icon" size={18} />
                <input
                  type="text"
                  className="field-input"
                  placeholder="Search by name or username"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search people"
                />
              </label>

              <div className="sidebar-filters">
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
            </div>

            {error ? (
              <div className="status-banner status-banner--error">{error}</div>
            ) : null}
          </div>

          <section className="sidebar-list-panel min-h-0 flex-1">
            <div className="conversation-list-header">
              <div>
                <span className="section-chip">Inbox</span>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  Contacts
                </h2>
              </div>
              <span className="count-badge">{filteredConversations.length}</span>
            </div>

            <div className="message-scroll conversation-list flex h-full flex-col gap-2 pr-1">
              {isFetchingConversations
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="conversation-skeleton">
                      <div className="flex animate-pulse items-center gap-3">
                        <div className="h-14 w-14 rounded-[18px] bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 rounded-full bg-white/14" />
                          <div className="h-3 w-24 rounded-full bg-white/10" />
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
                <div className="conversation-empty text-center">
                  <p className="font-semibold text-white">No matches found</p>
                  <p className="panel-subtitle mt-2 text-sm">
                    Try another search or switch back to all contacts.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        </aside>

        <div className="h-full min-h-0">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
}
