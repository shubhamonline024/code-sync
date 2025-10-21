import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  //   timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
