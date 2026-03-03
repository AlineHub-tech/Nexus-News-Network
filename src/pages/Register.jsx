import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import StaffGate from "../components/StaffGate"; // Import StaffGate hano

const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';
const API_REGISTER_URL = `${API_BASE_URL}/api/auth/register`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("writer");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // IKI NICYO GENZURA STAFF GATE
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(API_REGISTER_URL, { username, email, password, role });
      setMessage(`User ${username} registered successfully.`);
    } catch (err) {
      console.error(err.response?.data || err);
      const errorMessage = err.response?.data?.msg || "An error occurred during registration.";
      setError(errorMessage);
    }
  };

  // 1. BANZA UGENZURE STAFF GATE (Niba atarayinyuramo)
  if (!isVerified) {
    return <StaffGate onVerifySuccess={() => setIsVerified(true)} target="register" />;
  }

  // 2. NIBA AMAZE KUBA VERIFIED, MWEREKE REGISTER FORM
  return (
    <div className="auth-container">
      <div className="gate-header-icon">📝</div>
      <h2>Create Staff Account</h2>
      <p style={{textAlign: 'center', color: 'green', fontSize: '0.8rem', marginBottom: '15px'}}>
        Identity Verified. You can now register.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Assign Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="writer">Writer / Author</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="error">{error}</p>}
        {message && <p style={{color: 'green', textAlign: 'center'}}>{message}</p>}
        
        <button type="submit">Register User</button>
      </form>

      <p style={{textAlign: 'center', marginTop: '15px'}}>
        Already have an account? <Link to="/login" style={{color: '#2563eb', fontWeight: '700'}}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;
