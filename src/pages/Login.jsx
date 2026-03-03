import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import StaffGate from "../components/StaffGate"; // <--- Import StaffGate

const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';
const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // --- IGIKYENEWE KURI STAFF GATE ---
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleVerifySuccess = (staffEmail) => {
    setEmail(staffEmail); // Hitamo email yageze muri gate uyishyire muri login email
    setIsVerified(true);
  };
  // ---------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const res = await axios.post(API_LOGIN_URL, { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const userRole = decoded.user.role; 

      login(token);

      if (userRole === 'admin') {
        alert("Logged in successfully as Admin!");
        navigate("/admin");
      } else if (userRole === 'writer') {
        alert("Logged in successfully as Author!");
        navigate("/author");
      } else {
        navigate("/");
      }

    } catch (err) {
      const errorMessage = err.response?.data?.msg || "An error occurred during login.";
      setError(errorMessage);
      setIsLoggingIn(false);
    }
  };

  // 1. Banza ugenzure niba yanyuze muri StaffGate
  if (!isVerified) {
    return <StaffGate onVerifySuccess={handleVerifySuccess} />;
  }

  // 2. Niba amaze kuyicamo, mwereke Login yawe isanzwe
  return (
    <div className="auth-container">
      <h2>Final Login</h2>
      <p style={{textAlign:'center', color:'green', fontSize:'0.8rem'}}>Identity Verified. Please enter your password.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" value={email} readOnly style={{background:'#f0f0f0'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login Now'}
        </button>
      </form>
    </div>
  );
};

export default Login;
