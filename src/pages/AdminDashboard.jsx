// src/pages/AdminDashboard.jsx (cyangwa aho ubika admin dashboard yawe)
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import { useAuth } from '../context/AuthContext'; // Injizamo AuthContext nshya
import "../styles/dashboard.css"; // Koresha CSS iyo uhari

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";
const API_ADMIN_URL = `${API_BASE_URL}/api/admin`; 

// Component yo guhindura inkuru (Edit Modal)
const EditNewsModal = ({ newsItem, onClose, onUpdateSuccess }) => {
  const { getToken } = useAuth();
  const [title, setTitle] = useState(newsItem.title);
  const [content, setContent] = useState(newsItem.content || ''); // Assuming content field exists
  const [category, setCategory] = useState(newsItem.category || ''); 
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${newsItem._id}`, 
        { title, content, category },
        { headers: { "x-auth-token": token } }
      );
      alert("Inkuru yahinduwe neza!");
      onUpdateSuccess(); // Refresh lists
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error updating news:", err.response?.data?.msg || err.message);
      alert("Habaye ikibazo mu guhindura inkuru.");
    } finally {
        setIsUpdating(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit News Article</h3>
        <form onSubmit={handleUpdate}>
          <label>Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
          
          <label>Content:</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} required />

          <label>Category:</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
          
          <div className="modal-actions">
            <button type="submit" disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Save Changes'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  const { getToken } = useAuth(); // Koresha context
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [editingNewsItem, setEditingNewsItem] = useState(null); // State yo gufata inkuru iri edited

  // Function ifasha kubona URL y'ifoto cyangwa video neza
  const getMediaUrl = (mediaUrl) => {
    // MediaUrl iba itangira na /uploads/... 
    // Dushyiraho API_BASE_URL imbere kugira ngo URL yuzure neza: https://...
    // Tureba ko API_BASE_URL idafite trailing slash
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const media = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${media}`;
  };

  // Functions zose zishyizwe muri useCallback kugira ngo zikore neza muri useEffect
  const fetchPendingNews = useCallback(async () => {
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
  }, [getToken]);

  const fetchApprovedNews = useCallback(async () => {
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
  }, [getToken]);

  const refreshNewsLists = useCallback(() => {
    fetchPendingNews();
    fetchApprovedNews();
  }, [fetchPendingNews, fetchApprovedNews]);


  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, {
        headers: { "x-auth-token": token },
      });
      alert("Inkuru yemejwe kandi yashyizwe hanze!");
      refreshNewsLists(); 
    } catch (err) {
      console.error("Error approving news:", err.response?.data?.msg || err.message);
    }
  };

  // Function yo gusiba inkuru (Delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Ese uzi neza ko ushaka gusiba iyi nkuru burundu?")) return;
    try {
        const token = getToken();
        await axios.delete(`${API_ADMIN_URL}/articles/${id}`, {
          headers: { "x-auth-token": token },
        });
        alert("Inkuru yasibwe!");
        refreshNewsLists();
      } catch (err) {
        console.error("Error deleting news:", err.response?.data?.msg || err.message);
      }
  };

  useEffect(() => {
    refreshNewsLists();
  }, [refreshNewsLists]);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* MODAL IYO IFUNGUTSE */}
      {editingNewsItem && (
        <EditNewsModal 
          newsItem={editingNewsItem} 
          onClose={() => setEditingNewsItem(null)} 
          onUpdateSuccess={refreshNewsLists}
        />
      )}

      <h2>Inkuru Zitarasuzumwa (Pending Approval)</h2>
      <div className="admin-news-list">
      {pendingNews.length === 0 ? (<p>Nta nkuru nshya zitarasuzumwa zihari.</p>) : (
        pendingNews.map((n) => (
            <div key={n._id} className="news-item">
              <div>
                <h3>{n.title}</h3>
                <p>Author: {n.author} | Status: <strong>{n.status}</strong></p>
                {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="Media" />}
                {n.mediaUrl && n.mediaType === 'video' && <video src={getMediaUrl(n.mediaUrl)} controls />}
              </div>
              <div className="actions">
                <button onClick={() => handleApprove(n._id)}>Emeza</button>
                <button onClick={() => setEditingNewsItem(n)}>Edit</button>
                <button onClick={() => handleDelete(n._id)} className="delete-btn">Siba</button>
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
                {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="Media" />}
                {n.mediaUrl && n.mediaType === 'video' && <video src={getMediaUrl(n.mediaUrl)} controls />}
              </div>
              <div className="actions">
                <button onClick={() => setEditingNewsItem(n)}>Edit</button>
                <button onClick={() => handleDelete(n._id)} className="delete-btn">Siba Burundu</button>
              </div>
            </div>
        ))
      )}
      </div>
      <hr />

      <h2>Shyiraho Ads Nshya (Upload Method)</h2>
      <AdsUpload refreshNewsLists={refreshNewsLists} />
    </div>
  );
};

// Component ya AdsUpload yakosowe:
const AdsUpload = ({ refreshNewsLists }) => {
  const { getToken } = useAuth();
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
      if (refreshNewsLists) refreshNewsLists(); // Refresh lists after ad upload (optional, but good practice)
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert("Habaye ikibazo mu kohereza Ad.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-form">
      {/* ... forms fields remain the same */}
      <input placeholder="Title y'Ad" value={title} onChange={e=>setTitle(e.target.value)} required/>
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required/>
      <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
      </select>
      <input
          type="file"
          accept={mediaType === 'image' ? 'image/*' : 'video/*'}
          onChange={e => setMediaFile(e.target.files[0])}
      />
      <button type="submit">Shyiraho Ad</button>
    </form>
  );
};


export default AdminDashboard;
