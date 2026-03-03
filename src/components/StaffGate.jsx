import React, { useState } from "react";
import "../styles/Auth.css";

const StaffGate = ({ onVerifySuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    secretKey: ""
  });
  const [error, setError] = useState("");

  const STAFF_DATABASE = [
    { email: "admin@nexus.rw", role: "admin", key: "nexus_admin_2026_#stayupdated" },
    { email: "writer@nexus.rw", role: "writer", key: "nexus_author_2026_#stayupdated" },
    { email: "author@nexus.rw", role: "writer", key: "nexus_author_2026_#stayupdated" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    const isStaff = STAFF_DATABASE.find(
      (u) => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.role === formData.role && 
        u.key === formData.secretKey
    );

    if (isStaff) {
      onVerifySuccess(formData.email);
    } else {
      setError("Identity verification failed! Access Denied.");
      setTimeout(() => {
         if(!isStaff) window.location.href = "/";
      }, 3000);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "40px" }}>🔒</span>
        <h2>Staff Verification</h2>
        <p style={{ color: "#666", fontSize: "0.85rem" }}>
          Unauthorized access is strictly prohibited.
        </p>
      </div>

      {/* 1. AUTOCOMPLETE="OFF" HANO KURI FORM */}
      <form onSubmit={handleVerify} className="auth-form" autoComplete="off">
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Staff Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your professional email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-email" /* 2. IBI BIBWIRA BROWSER KUTABYUZUZA */
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Access Level</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px"
            }}
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Administrator</option>
            <option value="writer">Author / Writer</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Secret Access Key</label>
          <input
            type="password"
            name="secretKey"
            placeholder="Enter Secret Key"
            value={formData.secretKey}
            onChange={handleChange}
            autoComplete="new-password" /* 3. IBI BIBWIRA BROWSER KUTABYUZUZA */
            required
          />
        </div>

        {error && (
          <p className="error" style={{ marginBottom: "15px" }}>
            {error}
          </p>
        )}

        <button type="submit">Verify Identity</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.8rem" }}>
        <a href="/" style={{ color: "#0a1930", textDecoration: "none" }}>
          ← Back to News Portal
        </a>
      </p>
    </div>
  );
};

export default StaffGate;
