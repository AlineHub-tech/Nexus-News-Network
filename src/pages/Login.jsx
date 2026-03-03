import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import StaffGate from "../components/StaffGate"; // Hakurikirwa aho StaffGate iherereye

const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';
const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Logic igenzura niba yanyuze muri Staff Gate
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
      console.error(err.response?.data || err);
      const errorMessage = err.response?.data?.msg || "An error occurred during login.";
      setError(errorMessage);
      setIsLoggingIn(false);
    }
  };

  // 1. BANZA UGENZURE STAFF GATE (Niba atarayinyuramo)
  if (!isVerified) {
    return <StaffGate onVerifySuccess={() => setIsVerified(true)} target="login" />;
  }

  // 2. NIBA AMAZE KUBA VERIFIED, MWEREKE LOGIN FORM ISANZWE
  return (
    <div className="auth-container">
      <div className="gate-header-icon">👤</div>
      <h2>Staff Login</h2>
      <p style={{textAlign: 'center', color: 'green', fontSize: '0.8rem', marginBottom: '15px'}}>
        Identity Verified. Access granted to login form.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{textAlign: 'center', marginTop: '15px'}}>
        Don't have an account? <Link to="/register" style={{color: '#2563eb', fontWeight: '700'}}>Register here</Link>
      </p>
    </div>
  );
};

// IKI NICYO CYARI KIBURA KURI VERCEL:
export default Login; 
