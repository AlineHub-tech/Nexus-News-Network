import React, { useState }  from "react";
import axios from "axios";
import "../styles/dashboard.css";

// Import components
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

// --- ADIRESI YA API ---
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000'; 
const API_SUBMIT_URL = `${API_BASE_URL}/api/writer/articles`; 

const getToken = () => localStorage.getItem("token");

const AuthorDashboard = () => {
  const [title, setTitle] = useState("");
  // Twahinduye izina 'body' riba 'content' kugira ngo bihuze na backend model
  const [content, setContent] = useState(""); 
  const [category, setCategory] = useState("Politics");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // Twohereje 'content'
    formData.append("category", category);
    formData.append("mediaType", mediaType);
    if (mediaFile) {
        formData.append("mediaFile", mediaFile);
    }

    try {
      const token = getToken();
      if (!token) { 
        alert("Ntabwo winjiye (Logged out). Banza winjire."); 
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
      
      // Gusukura form nyuma yo kohereza
      setTitle(""); 
      setContent(""); 
      setMediaFile(null); 
      setIsSubmitting(false);

    } catch (err) {
      console.error("Submission Error:", err.response ? err.response.data : err.message);
      alert("Habaye ikibazo mu kohereza inkuru. Reba niba ifoto cyangwa video bimeze neza."); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar /> 

      <div className="dashboard-container">
        <h2 style={{marginTop: "20px"}}>Submit New Article</h2>
        <form onSubmit={handleSubmit} className="dashboard-form">
          <input 
            type="text" 
            placeholder="Article Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
          
          <textarea 
            placeholder="Write your article content here... (Enter creates a new paragraph)" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required
            rows={10}
            style={{ whiteSpace: "pre-wrap" }} // Ibi bituma ubona amaparagarafu mu gihe wandika
          />

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
            <option value="TV">TV (Video Content)</option>
            <option value="Community">Community</option>
          </select>

          <label>Media Type:</label>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
              <option value="image">Image</option>
              <option value="video">Video</option>
          </select>

          <label>Upload Media:</label>
          <input
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => setMediaFile(e.target.files[0])}
            required={mediaType === 'video'} // Video yo kuyibura ni ikibazo muri TV section
          />

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Submitting Article...' : 'Submit Article for Approval'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AuthorDashboard;
