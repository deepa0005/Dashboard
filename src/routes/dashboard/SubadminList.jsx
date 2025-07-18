import { useEffect, useState } from "react";
import axios from "axios";

const SubadminList = () => {
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubadmins = async () => {
      try {
        const res = await axios.get(
          "https://landing-page-nodejs-1.onrender.com/api/admin/get-subadmins",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSubadmins(res.data.subadmins);
      } catch (err) {
        console.error("Error fetching subadmins", err);
        setError("Failed to load subadmins. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubadmins();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        All Subadmins
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading subadmins...</p>
        // Optionally add a skeleton loader here
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      ) : subadmins.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No subadmins found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subadmins.map((subadmin) => (
            <li
              key={subadmin.id}
              className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {subadmin.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subadmin.email}
              </p>
              {/* You can show role/permissions here if available */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubadminList;
