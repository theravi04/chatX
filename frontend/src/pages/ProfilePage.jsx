import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { UserPen, Calendar, Circle } from "lucide-react";
import UserIcon from "../components/User_Icon.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if(!file)
      return ;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({ profilePic: base64Image})
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-20">

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Your ChatX Profile
            </h1>
            <p className="text-gray-600 text-center mb-8">Manage your profile information</p>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={selectedImage || authUser?.profilePic || UserIcon}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200 shadow-md"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
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
              <p className="text-sm text-gray-600">
                {isUpdatingProfile ? "Uploading..." : "Click the pen icon to upload a new image"}
              </p>
            </div>

            {/* Profile Information Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Full Name</div>
                    <p className="text-gray-900 font-medium">{authUser?.fullName || "Not set"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Email</div>
                    <p className="text-gray-900 font-medium">{authUser?.email || "Not set"}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Account Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Member Since: </span>
                      <span className="text-gray-900">{authUser?.createdAt?.split("T")[0] || "Not available"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Circle size={18} className="text-green-500 fill-current" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">Account Status: </span>
                      <span className="text-green-500 font-medium">Active</span>
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