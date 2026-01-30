import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard1.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000"; 
const API_ADMIN_URL = `${API_BASE_URL}/api/admin`; 

const getToken = () => localStorage.getItem("token");

const getMediaUrl = (mediaUrl) => {
    if (!mediaUrl) return "";
    if (mediaUrl.startsWith('http')) return mediaUrl;
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const media = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${media}`;
};

// --- Edit Modal Component ---
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
    } catch (err) { alert("Error updating article."); }
    finally { setIsUpdating(false); }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit News Article</h3>
        <form onSubmit={handleUpdate}>
          <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Title" />
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} required placeholder="Content" />
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Admin Component ---
const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); 
  const [editingNewsItem, setEditingNewsItem] = useState(null);

  const refreshAllLists = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return;
      const [pendingRes, approvedRes, adsRes] = await Promise.all([
        axios.get(`${API_ADMIN_URL}/pending-articles`, { headers: { "x-auth-token": token } }),
        axios.get(`${API_ADMIN_URL}/approved-articles`, { headers: { "x-auth-token": token } }),
        axios.get(`${API_ADMIN_URL}/ads`, { headers: { "x-auth-token": token } })
      ]);
      setPendingNews(pendingRes.data || []);
      setApprovedNews(approvedRes.data || []);
      setAdsList(adsRes.data || []);
    } catch (err) { console.error("Fetch Error:", err); }
  }, []);

  useEffect(() => { refreshAllLists(); }, [refreshAllLists]);

  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, { headers: { "x-auth-token": token } });
      alert("Inkuru yemejwe!");
      refreshAllLists(); 
    } catch (err) { console.error(err); }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Siba iyi nkuru?")) return;
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
      refreshAllLists();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <h1>Admin Management Dashboard</h1>

        {editingNewsItem && (
          <EditNewsModal newsItem={editingNewsItem} onClose={() => setEditingNewsItem(null)} onUpdateSuccess={refreshAllLists} />
        )}

        {/* 1. Pending News */}
        <section className="admin-section">
          <h2>Pending Articles ({pendingNews.length})</h2>
          <div className="admin-news-grid">
            {pendingNews.map(n => (
              <div key={n._id} className="admin-news-card">
                <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-card-img" />
                <div className="admin-card-body">
                  <h3>{n.title}</h3>
                  <div className="btn-group">
                    <button onClick={() => handleApprove(n._id)} className="approve-btn">Approve</button>
                    <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Approved News (ZARI ZIKUYEKO - UBU ZARIHARI) */}
        <section className="admin-section">
          <h2>Approved Articles ({approvedNews.length})</h2>
          <div className="admin-news-grid">
            {approvedNews.map(n => (
              <div key={n._id} className="admin-news-card approved">
                <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-card-img" />
                <div className="admin-card-body">
                  <h3>{n.title}</h3>
                  <div className="btn-group">
                    <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
