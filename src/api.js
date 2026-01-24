import axios from "axios";

// Gukoresha VITE_API_URL iri muri .env file ya frontend, cyangwa localhost niba idahari
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Ongeramo token muri buri request Admin cyangwa Umwanditsi akora
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Guhuza neza na middleware ya 'auth.js' iri muri backend
    config.headers['x-auth-token'] = token; 
  }
  return config;
});

export default API;
