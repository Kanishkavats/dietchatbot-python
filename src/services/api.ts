"use client";

import axios from "axios";
import Cookies from "js-cookie"; // npm install js-cookie

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

// ✅ Add Authorization header dynamically before each request
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // get token from cookies
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
