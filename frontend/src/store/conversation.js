import { create } from "zustand";

export const useConversation = create((set)=>({
    selectedConvo:null,
    setSelectedConvo:(selectedConvo)=> set({selectedConvo}),
    messages:[],
    setMessages:(messages)=> set({messages})
}))