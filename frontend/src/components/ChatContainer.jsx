import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const skeletonMessages = Array(6).fill(null);

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full max-w-[100%] mx-auto overflow-hidden flex flex-col h-full border-t">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-bg)] opacity-95">
        {messages.map((msg, idx) => {
              const isLastMessage = idx === messages.length - 1;
              return (
                <div
                  key={msg._id}
                  ref={isLastMessage ? messageEndRef : null}
                  className={`flex items-end gap-2 ${
                    msg.senderId === authUser._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <span className="text-sm text-[var(--color-text)] text-opacity-60">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div
                      className={`p-2 rounded-md break-words ${
                        msg.senderId !== authUser._id
                          ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                          : "bg-[var(--color-text)] text-[var(--color-bg)]"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Sent"
                          className="w-22 h-auto mb-2 hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      )}
                      <p className="text-xl">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;