import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

// --- UMURONGO W'INGENZI URI KUGENA API BASE URL ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash ku iherezo)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

// HANO NIHO HAKOSOWE: Nongeyemo '/api' kugira ngo ihuze na Server.js (app.use('/api/auth', authRoutes))
const API_REGISTER_URL = `${API_BASE_URL}/api/auth/register`;
// ----------------------------------------


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("writer");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // API_REGISTER_URL irakora neza hano kubera '/api' yongewemo hejuru
      const res = await axios.post(API_REGISTER_URL, { username, email, password, role });

      // Ubutumwa buhuje n'ururimi rwa code (English)
      setMessage(`User ${username} registered successfully. Token: ${res.data.token.substring(0, 20)}...`);

    } catch (err) {
      console.error(err.response?.data || err);
      // Kugenzura neza amakosa atandukanye no gutanga ubutumwa bw'icyongereza
      const errorMessage = err.response?.data?.msg || err.message || "An error occurred during registration.";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="writer">Writer</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="error">{error}</p>}
        {message && <p style={{color: 'green'}}>{message}</p>}
        <button type="submit">Register</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '10px'}}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;