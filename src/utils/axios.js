import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:5000/api/admin", // ✅ adjust if needed
  withCredentials: true,
});

// ✅ Attach token from localStorage (if stored after login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;