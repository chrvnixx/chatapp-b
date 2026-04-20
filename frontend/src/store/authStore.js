import { create } from "zustand";
import { api } from "../lib/api";

const getErrorMessage = (error, fallbackMessage) =>
  error.response?.data?.message ?? fallbackMessage;

export const useAuthStore = create((set) => ({
  user: null,
  conversations: [],
  error: null,
  isLoading: false,
  isFetchingConversations: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  clearError: () => set({ error: null }),

  signup: async (fullName, username, password, gender) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/signup", {
        fullName,
        username,
        password,
        gender,
      });

      set({
        user: response.data.user,
        error: null,
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return response.data.user;
    } catch (error) {
      set({
        error: getErrorMessage(error, "Couldn't create your account."),
        isLoading: false,
        isAuthenticated: false,
        isCheckingAuth: false,
      });

      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      set({
        user: response.data.user,
        error: null,
        isLoading: false,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return response.data.user;
    } catch (error) {
      set({
        error: getErrorMessage(error, "Couldn't sign you in."),
        isLoading: false,
        isAuthenticated: false,
        isCheckingAuth: false,
      });

      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await api.post("/auth/logout");
    } finally {
      set({
        user: null,
        conversations: [],
        error: null,
        isLoading: false,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  getConversations: async () => {
    set({ isFetchingConversations: true, error: null });

    try {
      const response = await api.get("/users");

      set({
        conversations: response.data,
        error: null,
        isFetchingConversations: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: getErrorMessage(error, "Couldn't load your contacts."),
        isFetchingConversations: false,
        ...(error.response?.status === 401
          ? { isAuthenticated: false, user: null }
          : {}),
      });

      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const res = await api.get("/auth/check-auth");

      set({
        user: res.data.user,
        error: null,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return res.data.user;
    } catch {
      set({
        user: null,
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });

      return null;
    }
  },
}));
