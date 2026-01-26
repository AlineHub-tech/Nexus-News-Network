import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext"; 
import { jwtDecode } from 'jwt-decode'; // Dukeneye jwt-decode hano kugenzura role vuba

// --- UMURONGO W'INGENZI WAKOSOWE HANO ---
// Koresha Environment Variable VITE_API_URL iri muri Vercel Settings (https://url-ya-render.com)
// Niba uri local development, ukoresha http://localhost:5000/api gusa (HTTP)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
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
      // API_LOGIN_URL irakora neza hano
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
        alert("Mwinjiye neza nk'Admin! Uri kwererezwa kuri Admin Dashboard.");
        navigate("/admin");
      } else if (userRole === 'writer') {
        alert("Mwinjiye neza nka Author! Uri kwererezwa kuri Author Dashboard.");
        navigate("/author");
      } else {
        // Iyo role itazwi
        navigate("/");
      }

    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.msg || "Habaye ikibazo mu kwinjira.");
      setIsLoggingIn(false); 
    }
  };

  return (
    <div className="auth-container">
      <h2>Kwinjira (Login)</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Iri kwinjira...' : 'Injira'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '10px'}}>
        Nta account ufite? <Link to="/register">Kanda hano wiyandikishe</Link>
      </p>
    </div>
  );
};

export default Login;
