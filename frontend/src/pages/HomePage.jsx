import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen pt-14">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:relative
            w-80 h-[calc(100vh-4rem)] 
            bg-[var(--color-bg)] shadow-lg
            transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            z-40
          `}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 w-full lg:w-auto">
          <main className="bg-[var(--color-bg)] rounded-lg shadow-lg h-[calc(100vh-5rem)]">
            <div className="h-full relative">
              {!selectedUser ? (
                <div className="absolute inset-0 bg-[var(--color-bg-secondary)] rounded-lg">
                  <NoChatSelected />
                </div>
              ) : (
                <div className="flex flex-col h-full overflow-hidden">
                  <ChatContainer />
                </div>
              )}
            </div>
          </main>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed z-50 p-2 border rounded-full bg-[var(--color-bg)] shadow-lg transition-all duration-300 left-6 top-12"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4 text-[var(--color-text)]" />
          ) : (
            <ChevronRight className="h-4 w-4 text-[var(--color-text)]" />
          )}
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-opacity-100 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
