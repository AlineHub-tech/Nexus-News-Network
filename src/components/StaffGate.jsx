import React, { useState } from "react";

const StaffGate = ({ onVerifySuccess }) => {
  const [formData, setFormData] = useState({ email: "", role: "", secretKey: "" });
  const [error, setError] = useState("");

  // HANO NIHO USHYIRA AMAKURU Y'ABAKOZI BEMEREWE
  const STAFF_DATABASE = [
    { email: "admin@nexus.rw", role: "admin", key: "nexus_admin_2024" },
    { email: "author@nexus.rw", role: "writer", key: "nexus_author_2024" }
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    const isStaff = STAFF_DATABASE.find(
      (u) => u.email === formData.email && u.role === formData.role && u.key === formData.secretKey
    );

    if (isStaff) {
      onVerifySuccess(formData.email);
    } else {
      setError("Identity verification failed! Unauthorized access.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Staff Verification</h2>
      <p style={{textAlign:'center', fontSize:'0.8rem', color:'#666'}}>Enter staff credentials to unlock login.</p>
      <form onSubmit={handleVerify} className="auth-form">
        <input type="email" placeholder="Staff Email" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        
        <select required className="auth-input" style={{padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ccc'}}
          onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="">-- Select Role --</option>
          <option value="admin">Administrator</option>
          <option value="writer">Author / Writer</option>
        </select>

        <input type="password" placeholder="Secret Access Key" required 
          onChange={(e) => setFormData({...formData, secretKey: e.target.value})} />
        
        {error && <p className="error">{error}</p>}
        <button type="submit">Verify Identity</button>
      </form>
    </div>
  );
};

export default StaffGate;
