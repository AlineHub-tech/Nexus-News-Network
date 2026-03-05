import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsCard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const NewsCard = ({ post, extraClass = "" }) => {
  if (!post) return <div className="news-card-loading">Loading...</div>;

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `Hashize ${diffInMins} min`;
    if (diffInHours < 24) return `Hashize ${diffInHours} h`;
    return `Hashize iminsi ${diffInDays}`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('rw-RW', options);
  };

  const getMediaUrl = (url) => {
    if (!url) return "/placeholder-image.jpg";
    if (url.startsWith("http")) return url;
    const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}${url.startsWith("/") ? url : "/" + url}`;
  };

  return (
    <Link to={`/article/${post._id}`} className="news-card-link">
      <div className={`news-card ${extraClass}`}>
        <div className="news-media-container">
          <img 
            src={getMediaUrl(post.mediaUrl)} 
            alt={post.title} 
            className="news-card-image" 
            loading="lazy"
          />
          {post.mediaType === "video" && (
            <div className="video-icon-overlay">
              <i className="fas fa-play-circle"></i>
            </div>
          )}
          {post.category && (
            <span className="card-category-tag">{post.category}</span>
          )}
        </div>

        <div className="news-info">
          <div className="news-date-row">
            <span className="post-full-date">
              <i className="far fa-calendar-alt"></i> {formatDate(post.createdAt)}
            </span>
          </div>

          <h5 className="news-title">{post.title}</h5>

          {/* READ MORE IZIBUYE MUNSI YA TITLE */}
          <div className="read-more-wrapper">
            <span className="read-more-btn">
              Soma ibindi <i className="fas fa-arrow-right"></i>
            </span>
          </div>

          <div className="news-meta-bottom">
            <div className="author-info">
              <span className="author-prefix">Umwanditsi:</span>
              <span className="author-name">{post.author || "Nexus"}</span>
            </div>
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
