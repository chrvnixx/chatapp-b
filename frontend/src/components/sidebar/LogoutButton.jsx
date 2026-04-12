import { LogOut } from "lucide-react";
import React from "react";
import { useAuthStore } from "../../store/authStore";

export default function LogoutButton() {
  const { logout, checkAuth } = useAuthStore();

  async function handleLogout() {
    try {
      await logout();
      await checkAuth()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-auto">
      <LogOut
        onClick={handleLogout}
        className="hover:scale-110 active:scale-100"
      />
    </div>
  );
}
