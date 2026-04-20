export default function MessageSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="message-row">
        <div className="message-bubble w-full max-w-[22rem]">
          <div className="h-4 w-28 rounded-full bg-[rgba(19,34,56,0.08)]" />
          <div className="mt-3 h-4 w-full rounded-full bg-[rgba(19,34,56,0.08)]" />
          <div className="mt-3 h-4 w-3/4 rounded-full bg-[rgba(19,34,56,0.06)]" />
          <div className="mt-4 h-3 w-14 rounded-full bg-[rgba(19,34,56,0.08)]" />
        </div>
      </div>

      <div className="message-row message-row--self">
        <div className="message-bubble message-bubble--self w-full max-w-[18rem] opacity-85">
          <div className="h-4 w-24 rounded-full bg-white/45" />
          <div className="mt-3 h-4 w-full rounded-full bg-white/45" />
          <div className="mt-4 h-3 w-12 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
