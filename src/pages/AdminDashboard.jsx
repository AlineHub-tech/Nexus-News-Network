import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/dashboard1.css";

// Import Navbar na Footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000"; 
const API_ADMIN_URL = `${API_BASE_URL}/api/admin`; 

const getToken = () => localStorage.getItem("token");
const getMediaUrl = (mediaUrl) => {
    if (mediaUrl && mediaUrl.startsWith('https://res.cloudinary.com')) {
        return mediaUrl;
    }
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const media = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${media}`;
};

// --- Component yo guhindura inkuru (Edit Modal) ---
const EditNewsModal = ({ newsItem, onClose, onUpdateSuccess }) => {
  const [title, setTitle] = useState(newsItem.title);
  const [content, setContent] = useState(newsItem.content || newsItem.body || ''); 
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
      onUpdateSuccess(); 
      onClose(); 
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
            <button type="submit" disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Admin Dashboard Nyakuri ---
const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); 
  const [editingNewsItem, setEditingNewsItem] = useState(null); 

  const fetchPendingNews = useCallback(async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_ADMIN_URL}/pending-articles`, { headers: { "x-auth-token": token } });
      setPendingNews(res.data);
    } catch (err) { console.error(err); }
  }, []);

  const fetchApprovedNews = useCallback(async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_ADMIN_URL}/approved-articles`, { headers: { "x-auth-token": token } });
      setApprovedNews(res.data);
    } catch (err) { console.error(err); }
  }, []);

  const fetchAds = useCallback(async () => {
    try {
        const token = getToken(); 
        const res = await axios.get(`${API_ADMIN_URL}/ads`, { headers: { "x-auth-token": token } }); 
        setAdsList(res.data);
    } catch (err) { console.error(err); }
  }, []);

  const refreshAllLists = useCallback(() => {
    fetchPendingNews();
    fetchApprovedNews();
    fetchAds();
  }, [fetchPendingNews, fetchApprovedNews, fetchAds]);

  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, { headers: { "x-auth-token": token } });
      alert("Inkuru yemejwe!");
      refreshAllLists(); 
    } catch (err) { console.error(err); }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Ese uzi neza ko ushaka gusiba iyi nkuru?")) return;
    try {
        const token = getToken();
        await axios.delete(`${API_ADMIN_URL}/articles/${id}`, { headers: { "x-auth-token": token } });
        refreshAllLists();
      } catch (err) { console.error(err); }
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm("Siba iyi Ad?")) return;
    try {
        const token = getToken(); 
        await axios.delete(`${API_ADMIN_URL}/ads/${id}`, { headers: { "x-auth-token": token } });
        fetchAds(); 
    } catch (err) { console.error(err); }
  };

  useEffect(() => { refreshAllLists(); }, [refreshAllLists]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        {editingNewsItem && (
          <EditNewsModal 
            newsItem={editingNewsItem} 
            onClose={() => setEditingNewsItem(null)} 
            onUpdateSuccess={refreshAllLists}
          />
        )}

        <section className="admin-section">
          <h2>Inkuru Zitarasuzumwa (Pending Approval)</h2>
          <div className="admin-news-list">
            {pendingNews.length === 0 ? <p>Nta nkuru nshya zitarasuzumwa zihari.</p> : pendingNews.map((n) => (
              <div key={n._id} className="news-item">
                <div className="news-card-content">
                  <h3>{n.title}</h3>
                  <p>Author: {n.author} | Status: <strong>{n.status}</strong></p>
                  {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="Media" className="admin-media-preview" />}
                  {n.mediaUrl && n.mediaType === 'video' && <video src={getMediaUrl(n.mediaUrl)} controls className="admin-media-preview" />}
                </div>
                <div className="actions">
                  <button onClick={() => handleApprove(n._id)} className="approve-btn">Emeza</button>
                  <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Siba</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr />

        <section className="admin-section">
          <h2>Inkuru Zemejwe (Approved News)</h2>
          <div className="admin-news-list">
            {approvedNews.length === 0 ? <p>Nta nkuru zemejwe zihari.</p> : approvedNews.map((n) => (
              <div key={n._id} className="news-item">
                <div className="news-card-content">
                  <h3>{n.title}</h3>
                  <p>Author: {n.author} | Status: <strong>{n.status}</strong></p>
                  {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="Media" className="admin-media-preview" />}
                </div>
                <div className="actions">
                  <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Siba Burundu</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr />

         {/* 3. Ads Management */}
        <section className="admin-section">
          <h2>Ads Management</h2>
          <AdsUpload fetchAds={refreshAllLists} />
          <div className="admin-ads-grid">
            {adsList.map(ad => (
              <div key={ad._id} className="admin-ad-mini">
                {ad.mediaUrl ? <img src={getMediaUrl(ad.mediaUrl)} alt="" /> : <div className="text-placeholder">TEXT ONLY</div>}
                <div className="ad-mini-info">
                   <h4>{ad.title}</h4>
                   <span className="badge">{ad.placement || 'Slider'}</span>
                   <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// --- AdsUpload Sub-component ---
const AdsUpload = ({ fetchAds }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [placement, setPlacement] = useState("slider");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("mediaType", mediaType);
    formData.append("placement", placement);
    if (placement === "slider" && mediaFile) formData.append("mediaFile", mediaFile);

    try {
      const token = getToken();
      await axios.post(`${API_ADMIN_URL}/ads`, formData, {
        headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" }
      });
      alert("Ad yashyizweho!");
      setTitle(""); setDescription(""); setMediaFile(null);
      fetchAds();
    } catch (err) { alert("Error uploading ad."); }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-ad-form">
      <select value={placement} onChange={e => setPlacement(e.target.value)}>
        <option value="slider">Media Slider (Iburyo)</option>
        <option value="sidebar">Sidebar Card (Ibumoso - Text Only)</option>
      </select>
      <input placeholder="Ad Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Ad Description" value={description} onChange={e => setDescription(e.target.value)} required />
      {placement === "slider" && (
        <input type="file" onChange={e => setMediaFile(e.target.files[0])} required />
      )}
      <button type="submit" className="submit-btn">Upload Advertisement</button>
    </form>
  );
};

export default AdminDashboard;