import React from "react";
import "../styles/TVSection.css";

const TV = ({ videos }) => {
  // Gufata API URL ku buryo buziguye
  const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

  // Function ituma URL y'amashusho isomeka neza
  const getMediaUrl = (url) => {
    if (!url) return "";
    // Niba ari Cloudinary (itangirwa na http/https), yikoreshe uko iri
    if (url.startsWith("http")) return url;
    
    // Niba ari dosiye ikiri kuri server ya local (urugero: uploads/...)
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const path = url.startsWith('/') ? url : '/' + url;
    return `${base}${path}`;
  };

  return (
    <div className="page-wrapper">
      <div className="tv-section-container">
            <div className="popular-news-container">
            <div className="section-header">
                <span className="badge">TV</span>
                <h2 className="title">AMASHUSHO</h2>
                <div className="line"></div>
            </div>
        </div>

        {(!videos || videos.length === 0) ? (
          <div className="no-videos">Nta mashusho ya TV aboneka ubu.</div>
        ) : (
          <div className="tv-section-grid">
            {videos.map((videoItem) => (
              <div key={videoItem._id} className="tv-card">
                <div className="video-player-wrapper">
                  <video 
                    controls 
                    preload="metadata" 
                    playsInline 
                    className="tv-video-element"
                    key={videoItem.mediaUrl} // Bituma video yireload iyo URL ihindutse
                  >
                    <source src={getMediaUrl(videoItem.mediaUrl)} type="video/mp4" />
                    <source src={getMediaUrl(videoItem.mediaUrl)} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="tv-card-info">
                  <h4>{videoItem.title}</h4>
                  <p className="video-author">By: {videoItem.author || 'Nexus News'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TV;


