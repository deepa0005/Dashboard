import React, { useState, useEffect } from "react";
import defaultImg from "@/assets/profile-image.jpg";
import { Footer } from "../../layouts/footer";
import api from "../../utils/axios"; // ✅ Import your custom Axios instance

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile"); // 👈 relative path — baseURL handles root
        console.log("Profile response:", res.data);
        setProfile(res.data.data || res.data); // ✅ support both { data: {...} } and plain object
      } catch (err) {
        console.error("❌ Failed to load profile", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle photo selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    // Optional: preview selected image immediately
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profile_pic: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ Handle Save action
 const handleSave = async () => {
  const formData = new FormData();

  // Append all profile fields
  Object.entries(profile).forEach(([key, value]) => {
    formData.append(key, value || "");
  });

  // Only add new photo if selected
  if (photo) {
    formData.append("profile_pic", photo);
  }

  try {
    const response = await api.put("/update-profile", formData, {
       headers: {
    "Content-Type": "multipart/form-data",
  },
   withCredentials: true,
    });

    alert("✅ Profile updated successfully!");

    // Refetch updated profile after save
    const refreshed = await api.get("/profile");
    setProfile(refreshed.data.data || refreshed.data);
    setPhoto(null); // clear photo selection
  } catch (err) {
    console.error("❌ Failed to update profile", err.response || err);
    alert("Something went wrong while updating profile.");
  }
};


  // ✅ Render logic
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="p-4 text-red-500">Profile not found.</div>;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Profile</h1>

      <div className="card p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
          <img
  src={profile.profile_pic || defaultImg}
  alt="Profile"
  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-600"
/>
          <label className="text-sm text-blue-600 hover:underline dark:text-blue-400 cursor-pointer">
            Change Photo
            <input type="file" onChange={handlePhotoChange} hidden />
          </label>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Full Name", "full_name"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Address", "address"],
            ["Language", "language"],
            ["Time Zone", "time_zone"],
            ["Nationality", "nationality"],
            ["Merchant ID", "merchant_id"],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">{label}</label>
              <input
                type="text"
                name={key}
                value={profile[key] || ""}
                onChange={handleChange}
                className="input bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role || ""}
              readOnly
              className="input bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Save Changes
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
