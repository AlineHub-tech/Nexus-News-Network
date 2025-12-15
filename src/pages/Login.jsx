import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form);
    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
      // redirect based on role
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "author") navigate("/author");
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#f0f2f5" }}>
      <form onSubmit={handleSubmit} style={{ background:"#fff", padding:"40px", borderRadius:"8px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)", width:"300px" }}>
        <h2 style={{ marginBottom:"20px", textAlign:"center" }}>Login</h2>
        {error && <p style={{ color:"red", marginBottom:"10px" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={{ width:"100%", padding:"10px", marginBottom:"15px", borderRadius:"6px", border:"1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width:"100%", padding:"10px", marginBottom:"15px", borderRadius:"6px", border:"1px solid #ccc" }}
        />
        <button type="submit" style={{ width:"100%", padding:"10px", background:"#0077cc", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" }}>Login</button>
      </form>
    </div>
  );
}

