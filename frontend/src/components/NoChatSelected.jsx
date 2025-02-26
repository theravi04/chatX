import { MessageSquareText } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full bg-[var(--color-bg)]">
      <div className="text-center">
        <div className="flex justify-center">
        <div className="flex items-center justify-center rounded-lg w-14 h-full">
                <MessageSquareText size={24} />
              </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-[var(--color-text)]">
          Welcome to ChatX
        </h2>
        <p className="mt-2 text-[var(--color-text)] text-opacity-60">
          Select a user from the sidebar to start a conversation
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;