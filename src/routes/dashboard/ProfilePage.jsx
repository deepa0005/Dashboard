import React, { useState, useEffect } from "react";
import defaultImg from "@/assets/profile-image.jpg";
import { Footer } from "../../layouts/footer";
import api from "../../utils/axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const validateForm = () => {
    const errors = {};
    if (!profile.full_name?.trim()) errors.full_name = "Full name is required";
    if (!profile.email?.trim()) errors.email = "Email is required";
    if (!profile.phone?.trim()) errors.phone = "Phone is required";
    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value);
    });
    if (photo) formData.append("profile_pic", photo);

    try {
      setSaving(true);
      await api.put("/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Profile updated successfully");
      await fetchProfile(); // Refresh profile
      setPhoto(null);
      setFormErrors({});
    } catch (error) {
      console.error("❌ Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchProfile(); // Reset form
    setPhoto(null);
    setFormErrors({});
  };

  if (loading || !profile) return <div className="text-center p-4">Loading profile...</div>;

  return (
    <>
      <div className="p-4 md:p-8 max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Admin Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={
              photo
                ? URL.createObjectURL(photo)
                : profile.profile_pic
                ? `${api.defaults.baseURL}${profile.profile_pic}`
                : defaultImg
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["full_name", "Full Name", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "text"],
            ["address", "Address", "text"],
            ["language", "Language", "text"],
            ["time_zone", "Time Zone", "text"],
            ["nationality", "Nationality", "text"],
            ["role", "Role", "text"],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={profile[name] || ""}
                onChange={handleChange}
                className="input bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 border border-slate-300 rounded px-3 py-2 w-full"
              />
              {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
              )}
            </div>
          ))}

          {/* Merchant ID (read-only) */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Merchant ID</label>
            <input
              type="text"
              name="merchant_id"
              value={profile.merchant_id || ""}
              readOnly
              className="input bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 border border-slate-300 rounded px-3 py-2 w-full cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
