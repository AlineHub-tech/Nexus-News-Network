import axios from "axios";

// 1. Gukoresha baseURL isobanutse
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 0, // INGENZI: Bituma gu-upload video nini biticika (No timeout)
});

// 2. Interceptor ikosoye
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // 3. KOSORA HANO: Huza Header n'ibyo Middleware yawe itegereje
    // Niba Backend ikoresha 'x-auth-token':
    config.headers['x-auth-token'] = token; 

    // CYANGWA niba Backend ikoresha 'Bearer Token' (Ibi nibyo bikunze gukoreshwa):
    // config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Ongeraho ibi niba u-uploading files nini kugira ngo Axios itagira limit
  if (config.data instanceof FormData) {
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
