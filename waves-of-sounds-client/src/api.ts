import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://waves-of-sounds-server.onrender.com";
const api = axios.create({ baseURL: API_BASE });

// AFTER JWT - Add JWT automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // console.log("JWT sent:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
