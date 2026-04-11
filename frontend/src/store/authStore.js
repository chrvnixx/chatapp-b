import { create } from "zustand";
import axios from "axios";

const api_url = "http://localhost:4000/api";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (fullName, username, password, gender) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${api_url}/auth/signup`, {
        fullName,
        username,
        password,
        gender,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },
}));
