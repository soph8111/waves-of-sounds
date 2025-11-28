import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://waves-of-sounds-server.onrender.com";
const api = axios.create({ baseURL: API_BASE });

export default api;
