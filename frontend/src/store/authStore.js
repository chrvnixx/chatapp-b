import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const api_url = "http://localhost:4000/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (fullName, username, password, gender) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/signup`, {
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
      const response = await axios.post(`${api_url}/login`, {
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
}));
