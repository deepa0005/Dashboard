import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import {
  Bell,
  ChevronsLeft,
  Moon,
  Search,
  Sun
} from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </button>
        <div className="input">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-3 relative">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>
        <button className="btn-ghost size-10">
          <Bell size={20} />
        </button>

        {/* Profile Image + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="size-10 overflow-hidden rounded-full"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img
              src={profileImg}
              alt="profile"
              className="size-full object-cover"
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-md z-50">
              <Link
                to="/profile"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                onClick={() => setShowDropdown(false)}
              >
                My Profile
              </Link>

              <button
                onClick={() => {
                  navigate("/settings");
                  setShowDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Settings
              </button>

              {/* ✅ Add this only if the logged-in user is admin */}
              <Link
                to="/subadmin"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-blue-500"
                onClick={() => setShowDropdown(false)}
              >
                Manage Subadmins
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setShowDropdown(false);
                  navigate("/login");
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-red-500"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
