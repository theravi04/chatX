import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
// ... existing code ...

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore()
  const skeletonMessages = Array(6).fill(null);

  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  return (
    <div className="w-full max-w-[100%] mx-auto shadow-xl rounded-xl overflow-hidden flex flex-col h-[100vh]">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {isMessagesLoading
          ? skeletonMessages.map((_, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${
                  idx % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {idx % 2 === 0 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                )}
                <div className="flex flex-col gap-1">
                  <div className="w-32 h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="w-48 h-16 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
              </div>
            ))
          : messages.map((msg,idx) => (
              <div
                key={msg._id}
                ref={messageEndRef}
                className={`flex items-end gap-2 ${
                  msg.senderId === authUser._id
                    ? "justify-end"
                    : "justify-start"
                }`
                
              }
              >
                {/* <img 
                  src={msg.senderId === authUser._id
                    ? authUser.profilePic || "/User_Icon.png"
                    : selectedUser.profilePic || "/User_Icon.png"
                  }
                /> */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div
                    className={`p-3 rounded-2xl max-w-sm break-words ${
                      msg.sender === selectedUser._id
                        ? "bg-blue-500 text-white rounded-bl-none"
                        : "bg-gray-200 text-gray-800 rounded-br-none"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Sent"
                        className="w-full h-auto rounded-lg mb-2 hover:opacity-90 transition-opacity cursor-pointer"
                      />
                    )}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
