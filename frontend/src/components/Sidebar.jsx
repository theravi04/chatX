import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader, Users } from "lucide-react";
import UserIcon from "./User_Icon.png";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen p-4 space-x-3 bg-[var(--color-bg)]">
        <Loader className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
        <span className="text-sm font-medium text-[var(--color-text)]">Loading contacts...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-2 h-full bg-[var(--color-bg)] border-t border-r border-[var(--color-border)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-[var(--color-primary)]" />
          <span className="text-lg font-semibold text-[var(--color-text)]">Contacts</span>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => {setSelectedUser(user)
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200
                ${selectedUser?._id === user._id
                  ? "bg-[var(--color-hover)] ring-[var(--color-primary)]"
                  : "hover:bg-[var(--color-hover-lighter)]"
                } px-4 py-2 border rounded-md text-lg font-medium hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] hover:border-[var(--color-hover)] transition-colors`}
            >
              {/* User Avatar with Online Indicator */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || UserIcon}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-border)]"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[var(--color-bg)] rounded-full" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="text-base font-semibold text-[var(--color-text)] truncate">
                  {user.fullName}
                </div>
                <div className="text-sm mt-0.5">
                  {onlineUsers.includes(user._id) ? (
                    <span className="text-green-500 font-medium">Online</span>
                  ) : (
                    <span className="text-[var(--color-text)]">Offline</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;