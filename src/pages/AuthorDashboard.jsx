import React, { useState }  from "react";
import axios from "axios";
import "../styles/dashboard.css"; 

// --- UMURONGO W'INGENZI WAKOSOWE HANO ---
// Koresha Environment Variable VITE_API_URL iri muri Vercel Settings (https://url-ya-render.com)
// Niba uri local development, ukoresha http://localhost:5000/api gusa (HTTP)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_SUBMIT_URL = `${API_BASE_URL}/writer/articles`;
// ----------------------------------------


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
    // Nta formData.append("author", ...) kuko backend ibifatira muri Token

    try {
      const token = getToken();
      if (!token) { alert("Ntabwo winjiye."); setIsSubmitting(false); return; }

      // API_SUBMIT_URL irakora neza hano
      await axios.post(API_SUBMIT_URL, formData, {
        headers: { 
            "x-auth-token": token // Header ihuje na backend
        },
      });

      alert("Inkuru yoherejwe kuri admin approval (Status: Pending)");
      // Reset form
      setTitle(""); setBody(""); setMediaFile(null); setIsSubmitting(false);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("Habaye ikibazo mu kohereza inkuru.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Shyiraho Inkuru Nshya (Upload Method)</h2>
      <form onSubmit={handleSubmit} className="dashboard-form">
        <input type="text" placeholder="Title y'inkuru" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <textarea placeholder="Ibirimo byose (Content/Body)" value={body} onChange={(e) => setBody(e.target.value)} required/>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Politics">Politics</option><option value="Life">Life</option>
          <option value="Entertainment">Entertainment</option><option value="Culture">Culture</option>
          <option value="Education">Education</option><option value="Business">Business</option>
          <option value="Opinion">Opinion</option><option value="Sport">Sport</option>
          <option value="TV">TV (Amashusho)</option><option value="Community">Community</option>
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
          {isSubmitting ? 'Iri kohereza...' : 'Ohereza Inkuru Kuri Admin'}
        </button>
      </form>
    </div>
  );
};

export default AuthorDashboard;
