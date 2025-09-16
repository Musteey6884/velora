import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "";

const api = axios.create({
  baseURL: base || "/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("velora_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
