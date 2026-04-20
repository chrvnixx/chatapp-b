import React from "react";

export default function MessageSkeleton() {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat chat-start skeleton h-10 w-50 "></div>
      </div>
      <div className="chat chat-end">
        <div className="chat chat-start skeleton h-10 w-50 mb-4"></div>
      </div>
    </div>
  );
}
