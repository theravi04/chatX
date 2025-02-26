import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X, Video } from "lucide-react";
import UserIcon from "./User_Icon.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 border-b border-[var(--color-text)] bg-[var(--color-bg)]">
      <div className="flex items-center space-x-3">
        <img
          src={selectedUser.profilePic || UserIcon}
          alt="User"
          className="w-12 h-12 rounded-full border border-[var(--color-text)] shadow-sm object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg text-[var(--color-text)]">
            {selectedUser.fullName}
          </h3>
          <p
            className={`text-sm ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-500"
                : "text-[var(--color-text)]"
            }`}
          >
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2"> {/* Changed to space-x-2 for better spacing */}
        <button
          className="p-2 rounded-full hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
          aria-label="Video Call" // Added aria-label for accessibility
        >
          <Video size={20} className="text-[var(--color-text)]" /> {/* Added size for consistency */}
        </button>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
          aria-label="Close Chat" // Added aria-label for accessibility
        >
          <X size={20} className="text-[var(--color-text)]" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;