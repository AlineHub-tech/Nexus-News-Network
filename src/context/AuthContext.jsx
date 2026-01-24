import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

export const AuthContext = createContext();

const API_AUTH_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function yo kugenzura umukoresha ukoresheje token
  const fetchUser = async (token) => {
    try {
      axios.defaults.headers.common['x-auth-token'] = token; // Shyiramo token muri default headers
      const res = await axios.get(`${API_AUTH_URL}/user`); // Kohereza request kuri /api/auth/user (backend route)
      setUser(res.data);
    } catch (err) {
      console.error("Authentication failed during fetch:", err);
      localStorage.removeItem('token');
      setUser(null);
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
    // Tuvuye kuri login, twahita tumenya byihuse details zitari password muri token ubwayo
    const decoded = jwtDecode(token);
    setUser(decoded.user); // Dufata user object muri token
    fetchUser(token); // Ariko tugakomeza kugenzura ku server byizewe
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
