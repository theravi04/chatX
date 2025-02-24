import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react"
import { Toaster } from "sonner";

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log("onlineUsers: ",{onlineUsers});
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
  )
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login"/> }/>
        <Route path="/login" element={ !authUser ? <LogInPage /> : <Navigate to="/"/>} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/"/> }/>
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster richColors position="top-right" expand={true}/>
    </div>
  );
};

export default App;
