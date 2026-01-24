import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css"; 

const API_ADMIN_URL = "http://localhost:5000/api/admin";

const getToken = () => localStorage.getItem("token"); 

const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]); 
  const [approvedNews, setApprovedNews] = useState([]); 

  // Function igarura inkuru zitarasuzumwa
  const fetchPendingNews = async () => {
    try {
      const token = getToken();
      if (!token) return console.error("Admin not authenticated");

      const res = await axios.get(`${API_ADMIN_URL}/pending-articles`, {
        headers: { "x-auth-token": token },
      });
      setPendingNews(res.data);
    } catch (err) {
      console.error("Error fetching pending news:", err.response?.data?.msg || err.message);
    }
  };
  
  // FUNCTION IGARURA INKURU ZEMEJWE
  const fetchApprovedNews = async () => {
    try {
      const token = getToken();
      if (!token) return console.error("Admin not authenticated");

      const res = await axios.get(`${API_ADMIN_URL}/approved-articles`, {
        headers: { "x-auth-token": token },
      });
      setApprovedNews(res.data);
    } catch (err) {
      console.error("Error fetching approved news:", err.response?.data?.msg || err.message);
    }
  };

  // Function yo kwemeza inkuru (Approved)
  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, {
        headers: { "x-auth-token": token },
      });
      alert("Inkuru yemejwe kandi yashyizwe hanze!");
      fetchPendingNews(); // Refresh the pending list
      fetchApprovedNews(); // Refresh the approved list
    } catch (err) {
      console.error("Error approving news:", err.response?.data?.msg || err.message);
    }
  };

  // Function yo gusiba inkuru (Delete)
  const handleDelete = async (id) => {
    try {
        const token = getToken();
        await axios.delete(`${API_ADMIN_URL}/articles/${id}`, {
          headers: { "x-auth-token": token },
        });
        alert("Inkuru yasibwe!");
        fetchPendingNews(); // Refresh the pending list
        fetchApprovedNews(); // Refresh the approved list
      } catch (err) {
        console.error("Error deleting news:", err.response?.data?.msg || err.message);
      }
  };

  useEffect(() => {
    fetchPendingNews();
    fetchApprovedNews(); // Guhamagara approved news iyo page ifungutse
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Inkuru Zitarasuzumwa (Pending Approval)</h2>
      <div className="admin-news-list">
      {pendingNews.length === 0 ? (<p>Nta nkuru nshya zitarasuzumwa zihari.</p>) : (
        pendingNews.map((n) => (
            <div key={n._id} className="news-item">
              <div>
                <h3>{n.title}</h3>
                <p>Author: {n.author} | Status: <strong>{n.status}</strong></p>
                {n.mediaUrl && n.mediaType === 'image' && <img src={`http://localhost:5000${n.mediaUrl}`} alt="Media" style={{maxWidth: '100px'}} />}
                {n.mediaUrl && n.mediaType === 'video' && <video src={`http://localhost:5000${n.mediaUrl}`} controls style={{maxWidth: '100px'}} />}
              </div>
              <div>
                <button onClick={() => handleApprove(n._id)}>Emeza</button>
                <button onClick={() => handleDelete(n._id)}>Siba</button>
              </div>
            </div>
        ))
      )}
      </div>

      <hr />
      
      <h2>Inkuru Zemejwe (Approved News)</h2>
      <div className="admin-news-list">
      {approvedNews.length === 0 ? (<p>Nta nkuru zemejwe zihari.</p>) : (
        approvedNews.map((n) => (
            <div key={n._id} className="news-item">
              <div>
                <h3>{n.title}</h3>
                <p>Author: {n.author} | Status: <strong>{n.status}</strong></p>
                {n.mediaUrl && n.mediaType === 'image' && <img src={`http://localhost:5000${n.mediaUrl}`} alt="Media" style={{maxWidth: '100px'}} />}
                {n.mediaUrl && n.mediaType === 'video' && <video src={`http://localhost:5000${n.mediaUrl}`} controls style={{maxWidth: '100px'}} />}
              </div>
              <div>
                {/* Hano dukoresha gusa handleDelete kuko nta button yo kwemeza ikenewe */}
                <button onClick={() => handleDelete(n._id)} className="delete-btn">Siba Burundu</button>
              </div>
            </div>
        ))
      )}
      </div>
      <hr />

      <h2>Shyiraho Ads Nshya (Upload Method)</h2>
      {/* Dutanga fetch functions muri AdsUpload kugira ngo zikore refresh iyo Ad yoherejwe */}
      <AdsUpload fetchApprovedNews={fetchApprovedNews} fetchPendingNews={fetchPendingNews} />
    </div>
  );
};

// Component ya AdsUpload
const AdsUpload = ({ fetchApprovedNews, fetchPendingNews }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null); 
  const [mediaType, setMediaType] = useState("image");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("mediaType", mediaType);
    if (mediaFile) {
        formData.append("mediaFile", mediaFile); 
    }

    try {
      const token = getToken();
      await axios.post(`${API_ADMIN_URL}/ads`, formData, {
        headers: { "x-auth-token": token },
      });
      alert("Ad yoherejwe kandi irakora");
      setTitle(""); setDescription(""); setMediaFile(null); 
      // Refresh lists after successful upload
      if (fetchApprovedNews) fetchApprovedNews();
      if (fetchPendingNews) fetchPendingNews();
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert("Habaye ikibazo mu kohereza Ad.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-form">
      <input placeholder="Title y'Ad" value={title} onChange={e=>setTitle(e.target.value)} required/>
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required/>
      
      <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
      </select>

      <input 
          type="file" 
          accept={mediaType === 'image' ? 'image/*' : 'video/*'}
          onChange={e => setMediaFile(e.target.files[0])} // Gufata file ya mbere gusa
      />

      <button type="submit">Shyiraho Ad</button>
    </form>
  );
};


export default AdminDashboard;
