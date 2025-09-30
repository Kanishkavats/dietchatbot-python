"use client";

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);


// ✅ Add Authorization header dynamically
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Dynamically set Content-Type
  if (config.data instanceof FormData) {
    // Let browser set boundary automatically
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
}, (error) => Promise.reject(error));

export default api;
