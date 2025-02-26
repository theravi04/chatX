import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { UserPen, Calendar, Circle, User } from "lucide-react";
// Remove the UserIcon import since we'll use Lucide's User component instead
// import UserIcon from "../components/User_Icon.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if(!file)
      return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-[var(--color-bg)] shadow-md rounded-lg overflow-hidden border border-[var(--color-hover)]">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-[var(--color-text)] mb-2">
              Your ChatX Profile
            </h1>
            <p className="text-[var(--color-text)] opacity-75 text-center mb-8">Manage your profile information</p>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                {selectedImage || authUser?.profilePic ? (
                  <img
                    src={selectedImage || authUser?.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-[var(--color-hover)] shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full border-4 border-[var(--color-hover)] shadow-md flex items-center justify-center bg-[var(--color-bg)]">
                    <User size={64} className="text-[var(--color-text)]" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-[var(--color-hover)] hover:opacity-90 text-[var(--color-hover-text)] p-2 rounded-full cursor-pointer shadow-lg transition-all">
                  <UserPen size={18} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-sm text-[var(--color-text)] opacity-75">
                {isUpdatingProfile ? "Uploading..." : "Click the pen icon to upload a new image"}
              </p>
            </div>

            {/* Profile Information Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[var(--color-text)] border-b border-[var(--color-hover)] pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-[var(--color-text)] opacity-75">Full Name</div>
                    <p className="text-[var(--color-text)] font-medium">{authUser?.fullName || "Not set"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-[var(--color-text)] opacity-75">Email</div>
                    <p className="text-[var(--color-text)] font-medium">{authUser?.email || "Not set"}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[var(--color-text)] border-b border-[var(--color-hover)] pb-2">
                  Account Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-[var(--color-hover)]" />
                    <div>
                      <span className="text-sm font-medium text-[var(--color-text)] opacity-75">Member Since: </span>
                      <span className="text-[var(--color-text)]">{authUser?.createdAt?.split("T")[0] || "Not available"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Circle size={18} className="text-[var(--color-hover)] fill-current" />
                    <div>
                      <span className="text-sm font-medium text-[var(--color-text)] opacity-75">Account Status: </span>
                      <span className="text-[var(--color-hover)] font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;