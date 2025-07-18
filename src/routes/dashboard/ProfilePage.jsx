import React, { useState, useEffect } from "react";
import defaultImg from "@/assets/profile-image.jpg";
import { Footer } from "../../layouts/footer";
import api from "../../utils/axios"; // ✅ Axios instance

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch profile and subadmins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, subadminRes] = await Promise.all([
          api.get("/profile"),
          api.get("/subadmins"),
        ]);

        console.log("✅ Profile:", profileRes.data);
        console.log("✅ Subadmins:", subadminRes.data);

        setProfile(profileRes.data.data || profileRes.data);
        setSubadmins(subadminRes.data.subadmins || []);
      } catch (err) {
        console.error("❌ Fetch Error:", err.response?.data || err.message);
        setError("Failed to load profile or subadmins.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle profile photo
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

  // ✅ Save updated profile
  const handleSave = async () => {
    if (!profile) return;

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

      // Refetch updated profile
      const refreshed = await api.get("/profile");
      setProfile(refreshed.data.data || refreshed.data);
      setPhoto(null);
    } catch (err) {
      console.error("❌ Update Error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  // ✅ Handle UI loading/error
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="p-4 text-red-500">Profile not found.</div>;

  return (
    <div className="flex flex-col gap-y-6 p-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Profile Info */}
      <div className="card p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={profile.profile_pic || defaultImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <label className="text-sm text-blue-600 hover:underline cursor-pointer">
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
              <label className="block mb-1 text-sm font-medium text-slate-700">
                {label}
              </label>
              <input
                type="text"
                name={key}
                value={profile[key] || ""}
                onChange={handleChange}
                className="input border border-slate-300 rounded px-3 py-2 w-full"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role || ""}
              readOnly
              className="input bg-gray-100 text-gray-600 border border-slate-300 rounded px-3 py-2 w-full cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          Save Changes
        </button>
      </div>

      {/* Subadmin List */}
      <div className="card p-6 mt-4">
        <h2 className="text-xl font-semibold mb-4">Subadmin List</h2>
        {subadmins.length === 0 ? (
          <p className="text-gray-500">No subadmins found.</p>
        ) : (
          <table className="w-full table-auto text-sm border border-slate-300">
            <thead className="bg-gray-100">
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
