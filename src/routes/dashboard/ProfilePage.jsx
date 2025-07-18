import React, { useState, useEffect } from "react";
import defaultImg from "@/assets/profile-image.jpg";
import { Footer } from "../../layouts/footer";
import api from "../../utils/axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Fetch Error:", err.response?.data || err.message);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profile_pic: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!profile.full_name) errors.full_name = "Full name is required";
    if (!profile.email) errors.email = "Email is required";
    if (!profile.phone) errors.phone = "Phone number is required";
    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    if (photo) {
      formData.append("profile_pic", photo);
    }

    try {
      await api.put("/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Profile updated successfully!");

      const refreshed = await api.get("/profile");
      setProfile(refreshed.data.data || refreshed.data);
      setPhoto(null);
    } catch (err) {
      console.error("❌ Update Error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="p-4 text-red-500">Profile not found.</div>;

  return (
    <div className="flex flex-col gap-y-6 p-4 text-slate-900 dark:text-white">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="card p-6 flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-slate-800">
        <div className="flex flex-col items-center gap-4">
          <img
            src={profile.profile_pic || defaultImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <label className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
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
              <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
              </label>
              <input
                type="text"
                name={key}
                value={profile[key] || ""}
                onChange={handleChange}
                className={`input border border-slate-300 bg-white dark:bg-slate-700 dark:text-white rounded px-3 py-2 w-full ${
                  formErrors[key] ? "border-red-500" : ""
                }`}
              />
              {formErrors[key] && (
                <p className="text-red-500 text-xs mt-1">{formErrors[key]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role || ""}
              readOnly
              className="input bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 border border-slate-300 rounded px-3 py-2 w-full cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Centered Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          Save Changes
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded shadow"
        >
          Cancel
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
