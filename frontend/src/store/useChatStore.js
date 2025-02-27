import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  call: null,
  isReceivingCall: false,
  isCallActive: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
      console.log("Error in getUsers: ", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send messages");
    }
  },

  // subscribeToMessages: () => {
  //   const { selectedUser } = get();
  //   if (!selectedUser) return;

  //   // const { authUser } = useAuthStore.getState();
  //   // console.log(authUser);
    

  //   const socket = useAuthStore.getState().socket;
  //   socket.on("newMessage", (newMessage) => {
  //     if (newMessage.senderId !== selectedUser._id) return;
  //     set({ messages: [...get().messages, newMessage] });
  //   });

  //   // Listen for incoming call
  //   try {
  //     socket.on("incomingCall", ({ callerId, peerId }) => {
  //       console.log("Incoming call from:", callerId);
  //       set({ call: { callerId, peerId }, isReceivingCall: true });
  //     });
  
  //     // Listen for call ended event
  //     socket.on("callEnded", () => {
  //       set({ call: null, isReceivingCall: false, isCallActive: false });
  //     });
  //   } catch (error) {
  //     console.log(error.message);
      
  //   }
  // },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
  
    const socket = useAuthStore.getState().socket;
  
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  
    // Listen for incoming call
    socket.on("incomingCall", ({ callerId, peerId }) => {
      console.log("Incoming call from:", callerId);
      set({ call: { callerId, peerId }, isReceivingCall: true });
    });
  
    // Listen for call ended event
    socket.on("callEnded", () => {
      set({ call: null, isReceivingCall: false, isCallActive: false });
    });
  },
  
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("incomingCall");
    socket.off("callEnded");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  initiateCall: async () => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();
    console.log(selectedUser);
    console.log(authUser);
    
    

    if (!selectedUser) return toast.error("No user selected for calling.");

    try {
      await axiosInstance.post(`/call/initiate/${selectedUser._id}`, { peerId: authUser._id });
      console.log("Incoming call from:", authUser._id)
    } catch (error) {
      console.log(error);
      
      toast.error(error.response?.data?.message || "Failed to start call.");
    }
  },

  // acceptCall: () => set({ isReceivingCall: false, isCallActive: true }),
  acceptCall: () => {
    set({ isReceivingCall: false, isCallActive: true });
  },
  

  endCall: async () => {
    const { selectedUser, call } = get();
    if (!call) return;

    try {
      await axiosInstance.post(`/call/end/${selectedUser._id}`);
      set({ call: null, isReceivingCall: false, isCallActive: false });
    } catch (error) {
      toast.error("Failed to end call.");
    }
  },
}));
