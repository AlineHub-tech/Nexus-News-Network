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

// --- Admin Dashboard Main Component ---
const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); 
  const [editingNewsItem, setEditingNewsItem] = useState(null); 

  // Ibijyanye no kongera Ad nshya
  const [adTitle, setAdTitle] = useState("");
  const [adLink, setAdLink] = useState("");
  const [adFile, setAdFile] = useState(null);
  const [isUploadingAd, setIsUploadingAd] = useState(false);

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
    if (!window.confirm("Ese uzi neza ko ushaka gusiba iyi Ad?")) return;
    try {
        const token = getToken(); 
        await axios.delete(`${API_ADMIN_URL}/ads/${id}`, { headers: { "x-auth-token": token } });
        alert("Ad yasibwe!");
        fetchAds(); 
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
      alert("Ad yashyizweho neza!");
      setAdTitle(""); setAdLink(""); setAdFile(null);
      fetchAds();
    } catch (err) {
      alert("Habaye ikibazo mu gushyiraho Ad");
    } finally { setIsUploadingAd(false); }
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
          <h2>Inkuru Zitarasuzumwa (Pending)</h2>
          <div className="admin-news-list">
            {pendingNews.length === 0 ? <p>Nta nkuru nshya zihari.</p> : pendingNews.map((n) => (
              <div key={n._id} className="news-item">
                <div className="news-info">
                  <h3>{n.title}</h3>
                  <p>Author: {n.author}</p>
                  {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="" className="admin-preview-img" />}
                </div>
                <div className="actions">
                  <button className="approve-btn" onClick={() => handleApprove(n._id)}>Emeza</button>
                  <button className="edit-btn" onClick={() => setEditingNewsItem(n)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteArticle(n._id)}>Siba</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr />

        <section className="admin-section">
          <h2>Shyiraho Ads Nshya</h2>
          <form onSubmit={handleAddAd} className="ad-form">
            <input type="text" placeholder="Ad Title" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} required />
            <input type="text" placeholder="Ad Link (URL)" value={adLink} onChange={(e) => setAdLink(e.target.value)} required />
            <input type="file" accept="image/*" onChange={(e) => setAdFile(e.target.files[0])} required />
            <button type="submit" disabled={isUploadingAd}>{isUploadingAd ? 'Uploading...' : 'Shyiraho Ad'}</button>
          </form>
        </section>

        <section className="admin-section">
          <h2>Ads Ziriho</h2>
          <div className="ads-grid">
            {adsList.map((ad) => (
              <div key={ad._id} className="ad-card">
                <img src={getMediaUrl(ad.imageUrl)} alt={ad.title} />
                <p>{ad.title}</p>
                <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn">Siba Ad</button>
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
