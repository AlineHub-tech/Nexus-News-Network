import React, { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

// Import components (Emeza ko aho biherereye ari ho)
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

// --- ADIRESI YA API ---
// Koresha URL ya Render muri Vercel Environment Variables (VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000'; 
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
    
    // Check niba hari ifoto cyangwa video niba ari ngombwa
    if (!mediaFile) {
        return alert("Nyamuneka hitamo ifoto cyangwa video.");
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // Ihuza na backend model
    formData.append("category", category);
    formData.append("mediaType", mediaType);
    
    // Hano ni ho hashobora kuza ikibazo (mediaFile igomba kuba ddosiyesi nyayo)
    formData.append("mediaFile", mediaFile);

    try {
      const token = getToken();
      if (!token) { 
        alert("Ntabwo winjiye. Banza winjire nka Writer."); 
        setIsSubmitting(false); 
        return; 
      } 

      const response = await axios.post(API_SUBMIT_URL, formData, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data"
        },
      });

      alert("Inkuru yoherejwe neza! Tegereza ko Admin ayemeza."); 
      
      // Gusukura form
      setTitle(""); 
      setContent(""); 
      setMediaFile(null); 
      setIsSubmitting(false);
      
      // Ibi bituma file input isubira ubusa (Reset file input)
      document.getElementById('fileInput').value = "";

    } catch (err) {
      console.error("Submission Error Details:", err.response?.data || err.message);
      
      // Ubutumwa bwereka umuntu aho ikibazo kiri nyacyo
      const errorMsg = err.response?.data?.msg || "Habaye ikibazo mu kohereza inkuru.";
      alert(`${errorMsg} Reba niba ifoto cyangwa video ari nzima.`); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar /> 

      <div className="dashboard-container">
        <div className="author-header">
           <h2>SUBMIT NEW ARTICLE</h2>
           <p>Shyiraho inkuru yawe nshya hano.</p>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-form">
          <label>Title y'Inkuru:</label>
          <input 
            type="text" 
            placeholder="Andika umutwe w'inkuru..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
          
          <label>Inkuru Nyirizina (Content):</label>
          <textarea 
            placeholder="Andika inkuru yawe hano... Kanda 'Enter' kugira ngo usige umwanya (Paragraph)." 
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

          <label>Upload {mediaType === 'image' ? 'Image' : 'Video'}:</label>
          <input
            id="fileInput"
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => setMediaFile(e.target.files[0])} // IKI NI CYO KIBASHO CYAKOSEWE ([0])
            required
          />

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Sending to Cloudinary...' : 'Submit for Approval'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AuthorDashboard;
