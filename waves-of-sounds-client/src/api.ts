// src/api.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "/";

const api = axios.create({
  baseURL: API_BASE,
  // withCredentials: true, // uncomment hvis du senere bruger cookie-based auth
});

export default api;
