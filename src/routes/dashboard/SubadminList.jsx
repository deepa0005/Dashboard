import { useEffect, useState } from "react";
import axios from "axios";

const SubadminList = () => {
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchSubadmins = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://landing-page-nodejs-1.onrender.com/api/admin/get-subadmins",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //      setSubadmins(res.data || []);
  //     } catch (err) {
  //       console.error("Full Axios error:", err.response || err);
  //       if (err.response) {
  //         setError(
  //           `Error: ${err.response.status} - ${err.response.data.message || "Something went wrong"}`
  //         );
  //       } else {
  //         setError("Unknown error occurred.");
  //       }
  //     }

  //   };

  //   fetchSubadmins();
  // }, []);
useEffect(() => {
  const fetchSubadmins = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      const res = await axios.get(
        "https://landing-page-nodejs-1.onrender.com/api/admin/get-subadmins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubadmins(res.data || []);
    } catch (err) {
      console.error("Full Axios error:", err.response || err);
      if (err.response) {
        setError(
          `Error: ${err.response.status} - ${err.response.data.message || "Something went wrong"}`
        );
      } else {
        setError("Unknown error occurred.");
      }
    }
  };

  fetchSubadmins();
}, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        All Subadmins
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading subadmins...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      ) : subadmins.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No subadmins found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Permissions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Pic</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {subadmins.map((subadmin) => (
                <tr key={subadmin.id}>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">
                    {subadmin.full_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.email || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.phone || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.address || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {subadmin.role || "subadmin"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.permissions
                      ? Object.entries(subadmin.permissions)
                        .filter(([_, val]) => val)
                        .map(([key]) => key)
                        .join(", ") || "None"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.profile_pic ? (
                      <img
                        src={subadmin.profile_pic}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {subadmin.created_at
                      ? new Date(subadmin.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubadminList;
