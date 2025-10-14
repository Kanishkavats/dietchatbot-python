"use client";

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
});

// ✅ Add Authorization header and language header dynamically
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add language header
  const currentLang = localStorage.getItem('lang') || 'en';
  if (config.headers) {
    config.headers['Accept-Language'] = currentLang;
    config.headers['X-Language'] = currentLang;
  }

  // Console log for debugging
  console.log('🌐 API Request:', {
    url: config.url,
    method: config.method,
    language: currentLang,
    headers: {
      'Accept-Language': currentLang,
      'X-Language': currentLang
    }
  });

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
