import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/NewsCard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const NewsCard = ({ post, extraClass = '' }) => { 
  if (!post) return <div className="news-card">Loading...</div>;

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `Hashize ${diffInMins} min`;
    if (diffInHours < 24) return `Hashize ${diffInHours} h`;
    return `${diffInDays} d ago`;
  };

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}${url.startsWith('/') ? url : '/' + url}`;
  };
  
  return (
    <Link to={`/article/${post._id}`} className={`news-card-link ${extraClass}`}>
      <div className="news-card"> 
        <div className="news-media-container">
          {post.mediaType === 'video' ? (
             <video src={getMediaUrl(post.mediaUrl)} className="news-card-image" muted />
          ) : (
             <img src={getMediaUrl(post.mediaUrl)} alt={post.title} className="news-card-image" />
          )}
          {post.mediaType === 'video' && <div className="video-icon-overlay">▶</div>}
          <span className="card-category-tag">{post.category}</span>
        </div>
        
        <div className="news-info">
          <h5>{post.title}</h5>
          <div className="news-meta-bottom">
            <span className="author-name">By {post.author || 'Nexus'}</span>
            <span className="post-time">
                <i className="far fa-clock"></i> {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
