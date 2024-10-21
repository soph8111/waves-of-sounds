import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // For the backend
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

export default apiClient;
