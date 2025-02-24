import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'
import UserIcon from "./User_Icon.png"


const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
  
    return (
      <div className="flex items-center justify-between p-4 bg-[#f4f4f4] shadow-md rounded-t-lg border-b">
        <div className="flex items-center space-x-3">
          <img
            src={selectedUser.profilePic || UserIcon}
            alt="User"
            className="w-12 h-12 rounded-full border shadow-sm object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-gray-500"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <X size={20} />
        </button>
      </div>
    );
  };

// const ChatHeader = () => {
//     const {selectedUser, setSelectedUser} = useChatStore()
//     const {onlineUsers} = useAuthStore()
//   return (
//     <div>
//         <div>
//             <div>
//                 <div>
//                     <div>
//                         <img src={selectedUser.profilePic || UserIcon}/>
//                     </div>
//                 </div>
//                 {/* user info */}
//                 <div>
//                     <h3>{selectedUser.fullName}</h3>
//                     <p>{onlineUsers.includes(selectedUser._id) ? "online" : "offline"}</p>
//                 </div>
//             </div>
//             <button onClick={() => setSelectedUser(null)}>
//                 <X/>
//             </button>
//         </div>
//     </div>
//   )
// }

export default ChatHeader