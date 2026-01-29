// src/components/NewsCard.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/NewsCard.css";

// --- UMURONGO W'INGENZI WAKOSOWE HANO ---
// Koresha Environment Variable VITE_API_URL iri muri Vercel Settings (https://url-ya-render.com)
// Niba uri local development, ukoresha http://localhost:5000 (HTTP)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';
// ----------------------------------------


// Hano twongereye props nshya yitwa 'extraClass'
const NewsCard = ({ post, extraClass = '' }) => { 
  if (!post) return <div className="news-card">Loading...</div>;
  
  return (
    <Link to={`/article/${post._id}`} className="news-card-link">
      {/* Hano twashyize extraClass muri className ya div */}
      <div className={`news-card ${extraClass}`}> 
        <div className="news-media-container">
          {post.mediaUrl && post.mediaType === 'image' && (
            // Dukoresha API_BASE_URL nshya
            <img src={`${API_BASE_URL}${post.mediaUrl}`} alt={post.title} className="news-card-image" />
          )}
          {post.mediaUrl && post.mediaType === 'video' && (
            // Dukoresha API_BASE_URL nshya
            <video src={`${API_BASE_URL}${post.mediaUrl}`} controls className="news-card-video">
                Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="news-info">
          <h5>{post.title}</h5>
          <p className="news-meta">
            By <strong>{post.author}</strong> | {post.category} | {new Date(post.createdAt).toLocaleString()} 
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
