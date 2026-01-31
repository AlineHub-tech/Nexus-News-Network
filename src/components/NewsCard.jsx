// src/components/NewsCard.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/NewsCard.css";

// --- KOSORA API_BASE_URL (Shyiraho http: cyangwa https: nyayo) ---
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NewsCard = ({ post, extraClass = '' }) => { 
  if (!post) return <div className="news-card">Loading...</div>;

  // IYI NIYO LOGIC IKEMURA IKIBASO CY'AMAFOTO
  const getMediaUrl = (url) => {
    if (!url) return "";
    // Niba URL itangiye na 'http', bivuze ko ari Cloudinary yuzuye.
    // Yikoreshe gutyo gusa, NTUYOMERE kuri API_BASE_URL.
    if (url.startsWith('http')) return url;
    
    // Niba ari dosiye za kera (local), hano niho wongeraho API_BASE_URL
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const path = url.startsWith('/') ? url : '/' + url;
    
    return `${base}${path}`;
  };
  
  return (
    <Link to={`/article/${post._id}`} className="news-card-link">
      <div className={`news-card ${extraClass}`}> 
        <div className="news-media-container">
          {post.mediaUrl && post.mediaType === 'image' && (
            <img 
               src={getMediaUrl(post.mediaUrl)} 
               alt={post.title} 
               className="news-card-image" 
            />
          )}
          {post.mediaUrl && post.mediaType === 'video' && (
            <video 
               src={getMediaUrl(post.mediaUrl)} 
               controls 
               className="news-card-video"
            >
                Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="news-info">
          <h5>{post.title}</h5>
          <p className="news-meta">
            By <strong>{post.author}</strong> | {post.category} | {new Date(post.createdAt).toLocaleDateString()} 
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
