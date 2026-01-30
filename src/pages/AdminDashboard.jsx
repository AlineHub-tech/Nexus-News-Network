import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard1.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000"; 
const API_ADMIN_URL = `${API_BASE_URL}/api/admin`; 

const getToken = () => localStorage.getItem("token");

const getMediaUrl = (mediaUrl) => {
    if (mediaUrl && mediaUrl.startsWith('https://res.cloudinary.com')) return mediaUrl;
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
      alert("Habaye ikibazo mu guhindura inkuru.");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit News Article</h3>
        <form onSubmit={handleUpdate}>
          <label>Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
          <label>Content:</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} required />
          <label>Category:</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
          <div className="modal-actions">
            <button type="submit" className="save-btn">{isUpdating ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Admin Dashboard ---
const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); 
  const [editingNewsItem, setEditingNewsItem] = useState(null); 

  const refreshAllLists = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return;
      const [pending, approved, ads] = await Promise.all([
        axios.get(`${API_ADMIN_URL}/pending-articles`, { headers: { "x-auth-token": token } }),
        axios.get(`${API_ADMIN_URL}/approved-articles`, { headers: { "x-auth-token": token } }),
        axios.get(`${API_ADMIN_URL}/ads`, { headers: { "x-auth-token": token } })
      ]);
      setPendingNews(pending.data);
      setApprovedNews(approved.data);
      setAdsList(ads.data);
    } catch (err) { console.error("Error fetching data", err); }
  }, []);

  useEffect(() => { refreshAllLists(); }, [refreshAllLists]);

  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, { headers: { "x-auth-token": token } });
      alert("Inkuru yemejwe kandi yashyizwe hanze!");
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
        refreshAllLists(); 
    } catch (err) { console.error(err); }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <header className="admin-main-header">
          <h1>Admin Management Panel</h1>
          <p>Control news flow and advertisements across Nexus News Network.</p>
        </header>

        {editingNewsItem && (
          <EditNewsModal newsItem={editingNewsItem} onClose={() => setEditingNewsItem(null)} onUpdateSuccess={refreshAllLists} />
        )}

        {/* 1. Pending Section */}
        <section className="admin-section">
          <div className="section-title-wrap">
             <h2>Pending Approval ({pendingNews.length})</h2>
          </div>
          <div className="admin-grid">
            {pendingNews.map((n) => (
              <div key={n._id} className="admin-item-card">
                {n.mediaUrl && <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-item-img" />}
                <div className="admin-item-info">
                  <h3>{n.title}</h3>
                  <p>By {n.author} | {n.category}</p>
                  <div className="admin-btn-group">
                    <button onClick={() => handleApprove(n._id)} className="approve-btn">Approve</button>
                    <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Approved Section */}
        <section className="admin-section">
          <h2>Approved Articles</h2>
          <div className="admin-grid">
            {approvedNews.map((n) => (
              <div key={n._id} className="admin-item-card approved">
                <div className="admin-item-info">
                  <h3>{n.title}</h3>
                  <p>By {n.author} | {n.category}</p>
                  <div className="admin-btn-group">
                    <button onClick={() => setEditingNewsItem(n)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Ads Upload Section */}
        <section className="admin-section ads-management">
          <h2>Ads Management</h2>
          <div className="ads-container-split">
            <div className="ads-upload-side">
               <AdsUpload fetchAds={refreshAllLists} />
            </div>
            
            <div className="ads-list-side">
              <h3>Live Advertisements</h3>
              <div className="admin-ads-scroll">
                {adsList.map((ad) => (
                  <div key={ad._id} className="admin-ad-mini-card">
                    <div className="ad-mini-media">
                      {ad.mediaUrl ? <img src={getMediaUrl(ad.mediaUrl)} alt="" /> : <div className="no-media-placeholder">TEXT AD</div>}
                    </div>
                    <div className="ad-mini-text">
                      <h4>{ad.title}</h4>
                      <span className="ad-placement-badge">{ad.placement || 'slider'}</span>
                      <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn-sm">Siba</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// --- Sub-component: AdsUpload ---
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
    if (placement === "slider" && mediaFile) {
        formData.append("mediaFile", mediaFile);
    }

    try {
      const token = getToken();
      await axios.post(`${API_ADMIN_URL}/ads`, formData, {
        headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" },
      });
      alert("Ad yashyizweho neza!");
      setTitle(""); setDescription(""); setMediaFile(null);
      fetchAds(); 
    } catch (err) { alert("Habaye ikibazo mu gushyiraho Ad."); }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-ad-form">
      <div className="input-row">
        <label>Placement:</label>
        <select value={placement} onChange={e => setPlacement(e.target.value)}>
            <option value="slider">Media Slider (Iburyo)</option>
            <option value="sidebar">Sidebar (Ibumoso - Text Only)</option>
        </select>
      </div>
      <input placeholder="Ad Title" value={title} onChange={e=>setTitle(e.target.value)} required/>
      <textarea placeholder="Ad Description..." value={description} onChange={e=>setDescription(e.target.value)} required/>
      
      {placement === "slider" && (
        <div className="file-input-group">
          <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
              <option value="image">Image</option>
              <option value="video">Video</option>
          </select>
          <input type="file" accept={mediaType === 'image' ? 'image/*' : 'video/*'} 
                 onChange={e => setMediaFile(e.target.files[0])} required />
        </div>
      )}
      <button type="submit" className="admin-submit-btn">Upload Ad</button>
    </form>
  );
};

export default AdminDashboard;
