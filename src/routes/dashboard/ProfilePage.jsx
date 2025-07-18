import React, { useState, useEffect } from "react";
import defaultImg from "@/assets/profile-image.jpg";
import { Footer } from "../../layouts/footer";
import api from "../../utils/axios"; // ✅ Axios instance with baseURL + withCredentials

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch profile & subadmin list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, subadminRes] = await Promise.all([
          api.get("/profile"),
          api.get("/subadmins")
        ]);
        setProfile(profileRes.data.data || profileRes.data);
        setSubadmins(subadminRes.data.subadmins || []);
      } catch (err) {
        console.error("❌ Failed to load data", err);
        setError("Failed to load profile or subadmin list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
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

  const handleSave = async () => {
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
        withCredentials: true,
      });
      alert("✅ Profile updated successfully!");
      const refreshed = await api.get("/profile");
      setProfile(refreshed.data.data || refreshed.data);
      setPhoto(null);
    } catch (err) {
      console.error("❌ Failed to update profile", err);
      alert("Something went wrong while updating profile.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="p-4 text-red-500">Profile not found.</div>;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Profile</h1>

      {/* Profile Card */}
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
              <label className="block mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                {label}
              </label>
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

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Save Changes
        </button>
      </div>

      {/* Subadmin List Section */}
      <div className="card p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Subadmin List</h2>
        {subadmins.length === 0 ? (
          <p className="text-gray-500">No subadmins found.</p>
        ) : (
          <table className="w-full table-auto border border-slate-300 dark:border-slate-600 text-sm">
            <thead className="bg-gray-100 dark:bg-slate-800">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {subadmins.map((sub, i) => (
                <tr key={sub.id || i} className="text-center">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{sub.full_name}</td>
                  <td className="p-2 border">{sub.email}</td>
                  <td className="p-2 border">{sub.role}</td>
                  <td className="p-2 border">
                    {sub.permissions && typeof sub.permissions === "object"
                      ? Object.entries(sub.permissions)
                          .filter(([_, val]) => val)
                          .map(([perm]) => perm)
                          .join(", ")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
