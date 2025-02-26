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
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 border-t border-[var(--color-text)] bg-[var(--color-bg)]">
      {imagePreview && (
        <div className="relative w-40 h-40 mx-auto mb-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-[var(--color-text)]"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-[var(--color-error)] text-[var(--color-error-text)] p-1 rounded-full hover:bg-[var(--color-error-darker)]"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center space-x-2 w-full p-2 bg-[var(--color-input-bg)] rounded-lg"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] bg-[var(--color-input)] text-[var(--color-text)]"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="p-2 bg-[var(--color-button-secondary)] rounded-md hover:bg-[var(--color-button-secondary-hover)] text-[var(--color-button-secondary-text)]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 bg-[var(--color-hover)] text-[var(--color-hover-text)] rounded-md hover:bg-[var(--color-hover-darker)] disabled:bg-[var(--color-disabled)] disabled:text-[var(--color-disabled-text)]"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;