import { MessageSquare } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-6 rounded-full">
            <MessageSquare className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Welcome to ChatX
        </h2>
        <p className="mt-2 text-gray-500">
          Select a user from the sidebar to start a conversation
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;