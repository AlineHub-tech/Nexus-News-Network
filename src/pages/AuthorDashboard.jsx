import React, { useState }  from "react";
import axios from "axios";
import "../styles/dashboard.css";

// Import components (Menya neza ko location ariyo)
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

// --- UMURONGO W'INGENZI WAKOSOWE HANO MURI ADIRESI ---
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000'; 
const API_SUBMIT_URL = `${API_BASE_URL}/api/writer/articles`; 

const getToken = () => localStorage.getItem("token");

const AuthorDashboard = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Politics");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("category", category);
    formData.append("mediaType", mediaType);
    if (mediaFile) {
        formData.append("mediaFile", mediaFile);
    }

    try {
      const token = getToken();
      if (!token) { alert("You are not logged in."); setIsSubmitting(false); return; } 

      await axios.post(API_SUBMIT_URL, formData, {
        headers: {
            "x-auth-token": token
        },
      });

      alert("Article submitted for admin approval (Status: Pending)"); 
      setTitle(""); setBody(""); setMediaFile(null); setIsSubmitting(false);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("An error occurred while submitting the article."); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar /> {/* Navbar ihamagawe hano */}

      <div className="dashboard-container">
        <h2>Submit New Article</h2>
        <form onSubmit={handleSubmit} className="dashboard-form">
          <input type="text" placeholder="Article Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          
          {/* Textarea ikoresha CSS iri hepfo kugira ngo isige umwanya hagati ya paragraph */}
          <textarea placeholder="Content/Body" value={body} onChange={(e) => setBody(e.target.value)} required/>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Politics">Politics</option><option value="Life">Life</option>
            <option value="Entertainment">Entertainment</option><option value="Culture">Culture</option>
            <option value="Education">Education</option><option value="Business">Business</option>
            <option value="Opinion">Opinion</option><option value="Sport">Sport</option>
            <option value="TV">TV (Video)</option><option value="Community">Community</option>
          </select>

          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
              <option value="image">Image</option>
              <option value="video">Video</option>
          </select>

          <input
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => setMediaFile(e.target.files[0])}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Article for Approval'}
          </button>
        </form>
      </div>

      <Footer /> {/* Footer ihamagawe hano */}
    </div>
  );
};

export default AuthorDashboard;
