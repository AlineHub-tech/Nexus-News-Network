import React, { useState }  from "react";
import axios from "axios";
import "../styles/dashboard.css";

// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000'; 

// Adiresi yuzuye ubu ni: https://nexus-news-network-backend.onrender.com
const API_SUBMIT_URL = `${API_BASE_URL}/api/writer/articles`; 


const getToken = () => localStorage.getItem("token");

const AuthorDashboard = () => {
  const [title, setTitle] = useState("");
  // Twahinduye body ikaba content kugira ngo bihure na Admin side (Database field name)
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
    // Twohereje content aho kohereza body
    formData.append("content", content); 
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
      // Reset form
      setTitle(""); setContent(""); setMediaFile(null); setIsSubmitting(false);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("An error occurred while submitting the article. Check network tab for CORS issues.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Submit New Article</h2>
      <form onSubmit={handleSubmit} className="dashboard-form">
        <input type="text" placeholder="Article Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        {/* Dukoresha content hano */}
        <textarea placeholder="Content/Body" value={content} onChange={(e) => setContent(e.target.value)} required/>

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
  );
};

export default AuthorDashboard;
