import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "../styles/Auth.css";

const API_REGISTER_URL = "http://localhost:5000/api/auth/register";

const Register = () => { // Function component itangirira hano
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("writer");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Function ya handleSubmit igomba kuba hano imbere ya return
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(API_REGISTER_URL, { username, email, password, role });
      setMessage(`Umukoresha ${username} yaremwe neza. Token: ${res.data.token.substring(0, 20)}...`);
    } catch (err) {
      setError(err.response?.data?.msg || "Habaye ikibazo mu kwiyandikisha.");
    }
  };
  // Gusiba code yo hejuru muri function bitera scope error

  return (
    <div className="auth-container">
      <h2>Kwiyandikisha (Register User)</h2>
      {/* Hano twahamagaye handleSubmit neza kuko iri muri scope imwe */}
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
        <button type="submit">Iyandikishe</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '10px'}}>
        Usanzwe ufite account? <Link to="/login">Kanda hano winjire</Link>
      </p>
    </div>
  );
};

export default Register;
