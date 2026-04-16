import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const api_url = "http://localhost:4000/api";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
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

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/auth/login`, {
        username,
        password,
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

  conversations: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${api_url}/users`);
      set({ user: response.data.users, isLoading: true, isAuthenticated: true });
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
