import React, { useState } from "react";
import api from "../../utils/axios";

const SubadminForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    role: "subadmin",
    permissions: {
      canView: false,
      canEdit: false,
    },
    profile_pic: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "canView" || name === "canEdit") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, profile_pic: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("full_name", formData.full_name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("address", formData.address);
      payload.append("role", formData.role);
      payload.append("permissions", JSON.stringify(formData.permissions));
      if (formData.profile_pic) {
        payload.append("profile_pic", formData.profile_pic);
      }

      await api.post("/create-subadmin", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Subadmin created successfully!");
    } catch (err) {
      console.error("Error creating subadmin:", err);
      alert("Error creating subadmin");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors duration-500 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mt-8 w-full">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Create Subadmin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="input input-bordered w-full bg-gray-100 dark:bg-zinc-800 dark:text-white"
          value={formData.full_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full bg-gray-100 dark:bg-zinc-800 dark:text-white"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="input input-bordered w-full bg-gray-100 dark:bg-zinc-800 dark:text-white"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="input input-bordered w-full bg-gray-100 dark:bg-zinc-800 dark:text-white"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-6">
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <input
            type="checkbox"
            name="canView"
            checked={formData.permissions.canView}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          Can View
        </label>
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <input
            type="checkbox"
            name="canEdit"
            checked={formData.permissions.canEdit}
            onChange={handleChange}
            className="checkbox checkbox-secondary"
          />
          Can Edit
        </label>
      </div>

      <div className="mt-6">
        <input
          type="file"
          name="profile_pic"
          className="file-input file-input-bordered w-full dark:bg-zinc-800 dark:text-white"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSave}
        className="btn w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg transition-all duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Create Subadmin
      </button>
    </div>
  );
};

export default SubadminForm;
