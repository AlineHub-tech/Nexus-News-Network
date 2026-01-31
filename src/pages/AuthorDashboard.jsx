import React, { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 
const API_SUBMIT_URL = `${API_BASE_URL}/api/writer/articles`; 

const getToken = () => localStorage.getItem("token");

const AuthorDashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [category, setCategory] = useState("Politics");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mediaFile) {
        return alert("Nyamuneka hitamo ifoto cyangwa video.");
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); 
    formData.append("category", category);
    formData.append("mediaType", mediaType);
    
    // IMPORTANT: formData needs the actual file object
    formData.append("mediaFile", mediaFile);

    try {
      const token = getToken();
      if (!token) { 
        alert("Ntabwo winjiye. Banza winjire nka Writer."); 
        setIsSubmitting(false); 
        return; 
      } 

      await axios.post(API_SUBMIT_URL, formData, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data"
        },
      });

      alert("Inkuru yoherejwe neza! Tegereza ko Admin ayemeza."); 
      
      // Reset Form
      setTitle(""); 
      setContent(""); 
      setMediaFile(null); 
      setIsSubmitting(false);
      document.getElementById('fileInput').value = "";

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.msg || "Habaye ikibazo mu kohereza inkuru.";
      alert(`${errorMsg}`); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar /> 
      <div className="dashboard-container">
        <div className="author-header">
           <h2>SUBMIT NEW ARTICLE</h2>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-form">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            rows={12} 
            className="article-textarea" 
          />

          <div className="form-row">
            <div className="form-group">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Politics">Politics</option>
                    <option value="Life">Life</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Culture">Culture</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Sport">Sport</option>
                    <option value="TV">TV (Video)</option>
                    <option value="Community">Community</option>
                </select>
            </div>
            <div className="form-group">
                <label>Media Type:</label>
                <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div>
          </div>

          <label>Upload Media:</label>
          <input
            id="fileInput"
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            // CORRECTED LINE BELOW: Added [0]
            onChange={(e) => setMediaFile(e.target.files[0])} 
            required
          />

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Sending to Cloudinary...' : 'Submit Article'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AuthorDashboard;
