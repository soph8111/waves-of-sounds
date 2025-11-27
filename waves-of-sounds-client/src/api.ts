import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "https://waves-of-sounds-server.onrender.com";
const api = axios.create({ baseURL: API_BASE });

export default api;
