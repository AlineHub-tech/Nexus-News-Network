// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/dashboard.css"; // Menya neza ko iyi file ihari kandi ifite styles za modal

// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Yakosowe hano
const API_ADMIN_URL = `${API_BASE_URL}/api/admin`; 

// Kazi gusa ako kubona token muri localStorage
const getToken = () => localStorage.getItem("token");

// --- Component yo guhindura inkuru (Edit Modal) ---
const EditNewsModal = ({ newsItem, onClose, onUpdateSuccess }) => {
  const [title, setTitle] = useState(newsItem.title);
  // Dufashe ko inkuru ifite field ya 'content' na 'category' muri database
  const [content, setContent] = useState(newsItem.content || ''); 
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

// --- Component Nyakuri ya Admin Dashboard ---
const AdminDashboard = () => {
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [adsList, setAdsList] = useState([]); // State nshya yo kubika Ads
  const [editingNewsItem, setEditingNewsItem] = useState(null); // State yo gufata inkuru iri edited

  // Function ifasha kubona URL y'ifoto cyangwa video neza
  const getMediaUrl = (mediaUrl) => {
    // MediaUrl iba itangira na /uploads/... 
    // Dushyiraho API_BASE_URL imbere kugira ngo URL yuzure neza: https://...
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const media = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${media}`;
  };

  // Function yo kugarura inkuru zitarasuzumwa
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
  }, []);

  // FUNCTION IGARURA INKURU ZEMEJWE
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
  }, []);

  // FUNCTION IGARURA ADS
  const fetchAds = useCallback(async () => {
    try {
        const res = await axios.get(`${API_ADMIN_URL}/ads`); // Dukesha ko iyi route iri public cg se ukeneye token
        setAdsList(res.data);
    } catch (err) {
        console.error("Error fetching ads:", err.response?.data?.msg || err.message);
    }
  }, []);

  const refreshAllLists = useCallback(() => {
    fetchPendingNews();
    fetchApprovedNews();
    fetchAds();
  }, [fetchPendingNews, fetchApprovedNews, fetchAds]);


  // Function yo kwemeza inkuru (Approved)
  const handleApprove = async (id) => {
    try {
      const token = getToken();
      await axios.put(`${API_ADMIN_URL}/articles/${id}/approve`, {}, {
        headers: { "x-auth-token": token },
      });
      alert("Inkuru yemejwe kandi yashyizwe hanze!");
      refreshAllLists(); 
    } catch (err) {
      console.error("Error approving news:", err.response?.data?.msg || err.message);
    }
  };

  // Function yo gusiba inkuru (Delete Article)
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Ese uzi neza ko ushaka gusiba iyi nkuru burundu?")) return;
    try {
        const token = getToken();
        await axios.delete(`${API_ADMIN_URL}/articles/${id}`, {
          headers: { "x-auth-token": token },
        });
        alert("Inkuru yasibwe!");
        refreshAllLists();
      } catch (err) {
        console.error("Error deleting news:", err.response?.data?.msg || err.message);
      }
  };

  // Function yo gusiba Ads (Delete Ad)
  const handleDeleteAd = async (id) => {
    if (!window.confirm("Ese uzi neza ko ushaka gusiba iyi Ads?")) return;
    try {
        const token = getToken(); // Akenshi gusiba ads bisaba admin token
        await axios.delete(`${API_ADMIN_URL}/ads/${id}`, {
          headers: { "x-auth-token": token },
        });
        alert("Ad yasibwe!");
        fetchAds(); // Refresh Ads list only
      } catch (err) {
        console.error("Error deleting ad:", err.response?.data?.msg || err.message);
      }
  };


  useEffect(() => {
    refreshAllLists();
  }, [refreshAllLists]);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* MODAL IYO IFUNGUTSE */}
      {editingNewsItem && (
        <EditNewsModal 
          newsItem={editingNewsItem} 
          onClose={() => setEditingNewsItem(null)} 
          onUpdateSuccess={refreshAllLists}
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
                {/* Image/Video igaragaye neza */}
                {n.mediaUrl && n.mediaType === 'image' && <img src={getMediaUrl(n.mediaUrl)} alt="Media" />}
                {n.mediaUrl && n.mediaType === 'video' && <video src={getMediaUrl(n.mediaUrl)} controls />}
              </div>
              <div className="actions">
                <button onClick={() => handleApprove(n._id)}>Emeza</button>
                <button onClick={() => setEditingNewsItem(n)}>Edit</button>
                <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Siba</button>
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
                <button onClick={() => handleDeleteArticle(n._id)} className="delete-btn">Siba Burundu</button>
              </div>
            </div>
        ))
      )}
      </div>
      <hr />

      <h2>Shyiraho Ads Nshya (Upload Method)</h2>
      <AdsUpload fetchAds={fetchAds} />

      <hr />

      <h2>Ads Zihari</h2>
      <div className="admin-news-list">
        {adsList.length === 0 ? (<p>Nta Ads zihari.</p>) : (
            adsList.map((ad) => (
                <div key={ad._id} className="news-item">
                    <div>
                        <h3>{ad.title}</h3>
                        <p>{ad.description}</p>
                        {ad.mediaUrl && ad.mediaType === 'image' && <img src={getMediaUrl(ad.mediaUrl)} alt="Ad Media" />}
                        {ad.mediaUrl && ad.mediaType === 'video' && <video src={getMediaUrl(ad.mediaUrl)} controls />}
                    </div>
                    <div className="actions">
                        <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn">Siba Ad</button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

// Component ya AdsUpload yakosowe
const AdsUpload = ({ fetchAds }) => {
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
      if (fetchAds) fetchAds(); // Refresh Ads list
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
          onChange={e => setMediaFile(e.target.files[0])} // Use e.target.files[0]
      />
      <button type="submit">Shyiraho Ad</button>
    </form>
  );
};


export default AdminDashboard;

