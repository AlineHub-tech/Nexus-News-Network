import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

// --- UMURONGO W'INGENZI WAKOSOWE HANO MURI ADIRESI ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash ku iherezo)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

// Hano API_AUTH_URL yakosowe kugira ngo ihuze na Server.js (app.use('/api/auth', authRoutes))
const API_AUTH_URL = `${API_BASE_URL}/api/auth`;
// ----------------------------------------


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function yo kugenzura umukoresha ukoresheje token
  const fetchUser = async (token) => {
    try {
      axios.defaults.headers.common['x-auth-token'] = token; // Shyiramo token muri default headers
      // Guhamagara bikosoye neza ubu:
      const res = await axios.get(`${API_AUTH_URL}/user`); // Kohereza request kuri /api/auth/user
      setUser(res.data);
    } catch (err) {
      console.error("Authentication failed during fetch:", err);
      localStorage.removeItem('token');
      setUser(null);
      // Hano ukwiye guhita ukora logout() kugira ngo usibe default header ya axios
      delete axios.defaults.headers.common['x-auth-token']; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded.user);
    fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['x-auth-token']; // Kuvanamo header
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
