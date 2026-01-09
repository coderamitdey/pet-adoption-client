import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  // 🔹 Handle updating profile photo
  const handlePhotoUpdate = async () => {
    if (!photoURL) return toast.error("Photo URL cannot be empty!");

    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, { photoURL });
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update photo");
    }
    setUpdating(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center">
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 rounded-full mb-4 border-2 border-orange-400"
        />
        <h2 className="text-2xl font-bold mb-2">{user.displayName || "No Name"}</h2>
        <p className="text-gray-500 mb-4">{user.email}</p>

        {/* 🔹 Update photo URL */}
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Enter new photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <button
            onClick={handlePhotoUpdate}
            className={`btn btn-primary w-full ${updating ? "loading" : ""}`}
            disabled={updating}
          >
            Update Photo
          </button>
        </div>

        <Link to="/update-profile" className="btn btn-outline w-full">
          Update Information
        </Link>
      </div>
    </div>
  );
};

export default Profile;
