import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

// --- UMURONGO W'INGENZI URI KUGENA API BASE URL ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash ku iherezo)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// HANO NIHO HAKOSOWE: Nongeyemo '/api' kugira ngo ihuze na Server.js (app.use('/api/auth', authRoutes))
const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
// ----------------------------------------


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      // API_LOGIN_URL irakora neza hano kubera '/api' yongewemo hejuru
      const res = await axios.post(API_LOGIN_URL, { email, password });
      const { token } = res.data;

      // 1. Bika Token muri LocalStorage
      localStorage.setItem("token", token);

      // 2. Decode Token vuba kugira ngo umenye role
      const decoded = jwtDecode(token);
      const userRole = decoded.user.role; // Tuvuga ko structure ya token ari user.role

      // 3. Update Global Auth Context State
      login(token);

      // 4. Erekereza umukoresha aho akwiriye kujya
      if (userRole === 'admin') {
        // Ubutumwa bwahujwe mu Cyongereza
        alert("Logged in successfully as Admin! Redirecting to Admin Dashboard.");
        navigate("/admin");
      } else if (userRole === 'writer') {
        // Ubutumwa bwahujwe mu Cyongereza
        alert("Logged in successfully as Author! Redirecting to Author Dashboard.");
        navigate("/author");
      } else {
        // Iyo role itazwi
        navigate("/");
      }

    } catch (err) {
      console.error(err.response?.data || err);
      // Ubutumwa bw'ikosa nabwo bwahujwe mu Cyongereza
      const errorMessage = err.response?.data?.msg || "An error occurred during login.";
      setError(errorMessage);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '10px'}}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;