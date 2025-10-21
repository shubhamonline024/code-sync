import axios from "axios";

const backendURL = import.meta.env.VITE_API_BASE_URL;
console.log("backend URL -> ", backendURL);

const api = axios.create({
  baseURL: backendURL || "http://localhost:3001",
  //   timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
