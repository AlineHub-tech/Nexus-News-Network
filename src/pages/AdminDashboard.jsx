import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/dashboard1.css"; 

// Import components
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
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} required />
          <label>Category:</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); 
  const [editingNewsItem, setEditingNewsItem] = useState(null); 

  // Ads state
  const [adTitle, setAdTitle] = useState("");
  const [adLink, setAdLink] = useState("");
  const [adFile, setAdFile] = useState(null);
  const [isUploadingAd, setIsUploadingAd] = useState(false);

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
    } catch (err) { console.error("Fetch error:", err); }
  }, []);

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

  const handleAddAd = async (e) => {
    e.preventDefault();
    if (!adFile) return alert("Hitamo ifoto ya Ad");
    setIsUploadingAd(true);
    const formData = new FormData();
    formData.append("title", adTitle);
    formData.append("link", adLink);
    formData.append("adImage", adFile);
    try {
      const token = getToken();
      await axios.post(`${API_ADMIN_URL}/ads`, formData, {
        headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" }
      });
      alert("Ad yashyizweho!");
      setAdTitle(""); setAdLink(""); setAdFile(null);
      refreshAllLists();
    } catch (err) { alert("Ad upload failed"); } finally { setIsUploadingAd(false); }
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm("Siba iyi Ad?")) return;
    try {
        const token = getToken(); 
        await axios.delete(`${API_ADMIN_URL}/ads/${id}`, { headers: { "x-auth-token": token } });
        refreshAllLists(); 
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

        {/* 1. Pending Articles */}
        <section className="admin-section">
          <h2>Pending Approval ({pendingNews.length})</h2>
          <div className="admin-news-grid">
            {pendingNews.map((n) => (
              <div key={n._id} className="news-card-admin">
                <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-preview-img" />
                <div className="news-details">
                  <h3>{n.title}</h3>
                  <p>By {n.author} | {n.category}</p>
                  <div className="admin-actions">
                    <button className="approve-btn" onClick={() => handleApprove(n._id)}>Approve</button>
                    <button className="edit-btn" onClick={() => setEditingNewsItem(n)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteArticle(n._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Approved Articles (Hano niho hari hasigaye) */}
        <section className="admin-section">
          <h2>Approved Articles ({approvedNews.length})</h2>
          <div className="admin-news-grid">
            {approvedNews.map((n) => (
              <div key={n._id} className="news-card-admin approved">
                <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-preview-img" />
                <div className="news-details">
                  <h3>{n.title}</h3>
                  <p>By {n.author} | {n.category}</p>
                  <div className="admin-actions">
                    <button className="edit-btn" onClick={() => setEditingNewsItem(n)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteArticle(n._id)}>Delete Burundu</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Ads Management */}
        <section className="admin-section">
          <h2>Ads Management</h2>
          <form onSubmit={handleAddAd} className="ad-upload-form">
            <input type="text" placeholder="Ad Title" value={adTitle} onChange={e => setAdTitle(e.target.value)} required />
            <input type="text" placeholder="Ad Link (URL)" value={adLink} onChange={e => setAdLink(e.target.value)} required />
            <input type="file" onChange={e => setAdFile(e.target.files[0])} required />
            <button type="submit" disabled={isUploadingAd}>{isUploadingAd ? 'Uploading...' : 'Add Ad'}</button>
          </form>
          <div className="ads-grid-admin">
            {adsList.map(ad => (
              <div key={ad._id} className="ad-card-admin">
                <img src={getMediaUrl(ad.imageUrl)} alt="" />
                <p>{ad.title}</p>
                <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn-sm">Siba</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
