import { create } from "zustand";

export const useConversation = create((set) => ({
  selectedConvo: null,
  messages: [],
  setSelectedConvo: (selectedConvo) => set({ selectedConvo }),
  setMessages: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) => {
      const messageExists = state.messages.some(
        (existingMessage) => existingMessage._id === message._id,
      );

      if (messageExists) {
        return state;
      }

      return { messages: [...state.messages, message] };
    }),
  resetConversation: () => set({ selectedConvo: null, messages: [] }),
}));
