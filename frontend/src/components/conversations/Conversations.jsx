import React from "react";
import { useAuthStore } from "../../store/authStore";

export default function Conversations() {
  const { conversations, isLoading, error } = useAuthStore();

  return (
    <div className="border-t flex items-center gap-4 mt-2 px-3 pt-2">
      <div className="avatar">
        <div className="w-15 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>
      <div>JOHN DOE</div>
    </div>
  );
}
