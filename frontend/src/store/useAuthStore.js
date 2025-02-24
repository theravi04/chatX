import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "sonner"
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            set({authUser: null})
            toast.error(error.response?.data?.message || "Failed to check authentication");
            console.log("Error in checkAuth: ", error);
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            toast.success("Account Created Successfully!")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            console.log("Error in signup: ", error);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data})
            toast.success("User Logged In Successfully!")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            console.log("Error in login: ", error);
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            get().disconnectSocket()
            toast.success("Logout Successfull!")
        } catch (error) {
            console.log("Error in Logout: ", error);
            
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data})
            toast.success("Profile Photo Updates Successfully!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Photo updation failed");
            console.log("Error in Updating photo: ", error);
        } finally {
            set({isUpdatingProfile: false})
        }
    },

    connectSocket: () => {

        const { authUser } = get()
        if(!authUser || get().socket?.connected)
            return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect()

        set({socket:socket})

        socket.on("getUsersOnline", (userIds) => {
            set({ onlineUsers: userIds})
            
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected)
            get().socket.disconnect()
    }

}))