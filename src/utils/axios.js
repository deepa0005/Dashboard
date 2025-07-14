import axios from "axios";
import BASE_URL from "../config";


const api = axios.create({
  baseURL: `${BASE_URL}/api/admin`, // ✅ adjust if needed
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