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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Subadmin</h2>
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        className="input input-bordered w-full mb-2"
        value={formData.full_name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input input-bordered w-full mb-2"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="input input-bordered w-full mb-2"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="input input-bordered w-full mb-2"
        value={formData.address}
        onChange={handleChange}
      />
      <div className="mb-2">
        <label className="mr-2">
          <input
            type="checkbox"
            name="canView"
            checked={formData.permissions.canView}
            onChange={handleChange}
            className="mr-1"
          />
          Can View
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            name="canEdit"
            checked={formData.permissions.canEdit}
            onChange={handleChange}
            className="mr-1"
          />
          Can Edit
        </label>
      </div>
      <input
        type="file"
        name="profile_pic"
        className="file-input file-input-bordered w-full mb-4"
        onChange={handleChange}
      />
      <button className="btn btn-primary w-full" onClick={handleSave}>
        Create Subadmin
      </button>
    </div>
  );
};

export default SubadminForm;
