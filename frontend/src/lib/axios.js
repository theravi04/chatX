import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chatx-e8o4.onrender.com/api",
    // baseURL: "http://localhost:5001/api",
    withCredentials: true,
})