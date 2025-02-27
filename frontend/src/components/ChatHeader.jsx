import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X, Video, PhoneIncoming } from "lucide-react";
import UserIcon from "./User_Icon.png";
import VideoCallPopup from "./VideoCallPopup";

const ChatHeader = () => {
  const { 
    selectedUser, 
    setSelectedUser, 
    initiateCall, 
    call, 
    isReceivingCall, 
    acceptCall 
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  
  const handleVideoCall = () => {
    // Only allow video calls if the user is online
    if (onlineUsers.includes(selectedUser._id)) {
      setIsVideoCallOpen(true);
      initiateCall(selectedUser._id);
    } else {
      // You could add a toast notification here
      alert("User is offline. Video calls are only available when the user is online.");
    }
  };
  
  const handleAcceptCall = () => {
    acceptCall();
    setIsVideoCallOpen(true);
  };
  
  return (
    <>
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
        <div className="flex items-center space-x-2">
          {/* Incoming Call Button - Only shown when receiving a call */}
          {isReceivingCall && call && (
            <button
              onClick={handleAcceptCall}
              className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors animate-pulse"
              aria-label="Accept Incoming Call"
            >
              <PhoneIncoming size={20} />
            </button>
          )}
          
          <button
            onClick={handleVideoCall}
            className={`p-2 rounded-full transition-colors ${
              onlineUsers.includes(selectedUser._id)
                ? "hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)]"
                : "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Video Call"
            disabled={!onlineUsers.includes(selectedUser._id)}
          >
            <Video size={20} className="text-[var(--color-text)]" />
          </button>
          
          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
            aria-label="Close Chat"
          >
            <X size={20} className="text-[var(--color-text)]" />
          </button>
        </div>
      </div>
      
      {/* Video Call Popup */}
      <VideoCallPopup
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        callType={isReceivingCall ? "incoming" : "outgoing"}
      />
    </>
  );
};

export default ChatHeader;