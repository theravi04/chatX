import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import { toast } from "sonner";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessages } = useChatStore();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    };
  
    const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  
    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) {
        toast.error("Please enter a message");
        return;
      }
      try {
        await sendMessages({ text: text.trim(), image: imagePreview });
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.log(error)
        toast.error("Failed to send message");
      }
    };
  
    return (
      <div className="p-4 border-t bg-white shadow-md flex flex-col">
        {imagePreview && (
          <div className="relative w-40 h-40 mx-auto mb-4">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg border" />
            <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
              <X size={16} />
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 w-full p-2 bg-gray-100 rounded-lg">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
          <button type="button" className="p-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => fileInputRef.current?.click()}>
            <Image size={20} className="text-gray-600" />
          </button>
          <button type="submit" disabled={!text.trim() && !imagePreview} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300">
            <Send size={20} />
          </button>
        </form>
      </div>
    );
  };
  

// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
//   const { sendMessages } = useChatStore();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview) {
//       toast.error("Please enter a message");
//       return;
//     }
//     try {
//       await sendMessages({ text: text.trim(), image: imagePreview });
//       setText("");
//       setImagePreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       console.log("Failed to send message", error);
//       toast.error(error.response?.data?.message || "Failed to send message");
//     }
//   };

//   return (
//     <div className="p-4 border-t bg-white shadow-md flex flex-col">
//       {imagePreview && (
//         <div className="relative w-40 h-40 mx-auto mb-4">
//           <img
//             src={imagePreview}
//             alt="Preview"
//             className="w-full h-full object-cover rounded-lg border"
//           />
//           <button
//             onClick={removeImage}
//             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center space-x-2 w-full p-2 bg-gray-100 rounded-lg">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//         />
//         <button
//           type="button"
//           className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center justify-center"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <Image size={20} className="text-gray-600" />
//         </button>
//         <button
//           type="submit"
//           disabled={!text.trim() && !imagePreview}
//           className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 flex items-center justify-center"
//         >
//           <Send size={20} />
//         </button>
//       </form>
//     </div>
//   );
// };

export default MessageInput;