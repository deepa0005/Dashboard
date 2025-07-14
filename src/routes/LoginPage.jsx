import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, form, {
        withCredentials: true,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("❌ Login error", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/forgot-password`, {
        email: forgotEmail,
      });

      setMessage(res.data.message || "Reset link sent to your email");
    } catch (err) {
      console.error("❌ Forgot password error", err);
      setError(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-white">
          {showForgotPassword ? "Forgot Password" : "Admin Login"}
        </h2>

        {(error || message) && (
          <p
            className={`text-sm mb-4 text-center ${
              error ? "text-red-500" : "text-green-500"
            }`}
          >
            {error || message}
          </p>
        )}

        {!showForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-slate-700 dark:text-slate-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full input bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block mb-1 text-sm text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full input bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 rounded pr-10"
                required
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-[37px] cursor-pointer text-sm text-blue-500"
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>

            <div className="mb-4 text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full input bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-4 text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
