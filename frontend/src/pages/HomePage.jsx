import { useState } from "react";
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import {Menu} from 'lucide-react'
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { selectedUser } = useChatStore();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

    <div className="min-h-screen bg-blue-500">
      <Navbar/>
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:relative
            w-80 bg-white shadow-lg
            transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            z-40
          `}
        >
          <div className="h-full flex flex-col">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 w-full lg:w-auto">
          <main className="bg-white rounded-lg shadow-lg h-[calc(100vh-5rem)]">
            <div className="h-full relative">
              {!selectedUser ? (
                <div className="absolute inset-0 bg-gray-50 rounded-lg">
                  <NoChatSelected />
                </div>
              ) : (
                <div className="flex flex-col h-full rounded-lg overflow-hidden">
                  <ChatContainer />
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Sidebar Toggle for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`lg:hidden fixed z-50 p-2 rounded-full bg-white shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "left-72 top-20" : "left-4 top-20"
          }`}
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;