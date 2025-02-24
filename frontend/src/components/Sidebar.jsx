import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader, Users } from "lucide-react";
import UserIcon from "./User_Icon.png";
import { useAuthStore } from "../store/useAuthStore";

// ... existing code ...

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    if (isUserLoading) {
      return (
        <div className="flex items-center justify-center h-screen p-4 space-x-3 bg-gray-50">
          <Loader className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-sm font-medium text-gray-600">Loading contacts...</span>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col h-full bg-blue-400 shadow-lg">
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold text-gray-800">Contacts</span>
          </div>
        </div>
  
        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-2">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 
                  hover:bg-blue-50 hover:shadow-sm
                  ${selectedUser?._id === user._id 
                    ? "bg-blue-50 ring-2 ring-blue-200 shadow-sm" 
                    : "bg-white"
                }`}
              >
                {/* User Avatar with Online Indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || UserIcon}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
  
                {/* User Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-base font-semibold text-gray-900 truncate">
                    {user.fullName}
                  </div>
                  <div className="text-sm mt-0.5">
                    {onlineUsers.includes(user._id) ? (
                      <span className="text-green-600 font-medium">Online</span>
                    ) : (
                      <span className="text-gray-500">Offline</span>
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
  
  // ... existing code ...
// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
//   const { onlineUsers } = useAuthStore();

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (isUserLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen p-4 space-x-3 text-gray-500">
//         <Loader className="w-5 h-5 animate-spin" />
//         <span className="text-sm font-medium">Loading contacts...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-2">
//           <Users className="w-5 h-5 text-gray-500" />
//           <span className="font-semibold text-gray-700">Contacts</span>
//         </div>
//       </div>

//       {/* Users List */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-2 space-y-1">
//           {users.map((user) => (
//             <button
//               key={user._id}
//               onClick={() => setSelectedUser(user)}
//               className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
//                 selectedUser?._id === user._id 
//                   ? "bg-gray-100 ring-1 ring-gray-200" 
//                   : ""
//               }`}
//             >
//               {/* User Avatar with Online Indicator */}
//               <div className="relative">
//                 <img
//                   src={user.profilePic || UserIcon}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 {onlineUsers.includes(user._id) && (
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
//                 )}
//               </div>

//               {/* User Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="text-sm font-medium text-gray-900 truncate">
//                   {user.fullName}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {onlineUsers.includes(user._id) ? (
//                     <span className="text-green-500">Online</span>
//                   ) : (
//                     <span className="text-gray-400">Offline</span>
//                   )}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Sidebar;