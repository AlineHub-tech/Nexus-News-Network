import React from "react";
import "../styles/TVSection.css";

const TV = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="tv-section-container">
        <h2 className="section-title">TV Section</h2> 
        <div className="tv-section">Nta mashusho ya TV aboneka ubu.</div>
      </div>
    );
  }

  // Uburyo bwo kubona URL y'ukuri
  const getMediaUrl = (mediaUrl) => {
    if (!mediaUrl) return "";
    // Niba ari Cloudinary (itangira na http), yikoreshe gutyo
    if (mediaUrl.startsWith("http")) {
      return mediaUrl;
    }
    // Niba ari local (localhost), yunganire na server URL
    const BASE_SERVER_URL = import.meta.env.VITE_API_URL || "//localhost:5000";
    const base = BASE_SERVER_URL.endsWith('/') ? BASE_SERVER_URL.slice(0, -1) : BASE_SERVER_URL;
    const path = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${path}`;
  };

  return (
    <div className="tv-section-container"> 
      <h2 className="section-title">AMASHUSHO (TV)</h2> 

      <div className="tv-section">
        {videos.map((videoItem) => {
          const videoUrl = getMediaUrl(videoItem.mediaUrl);
          
          return (
            <div key={videoItem._id} className="tv-card">
              {/* Nasubiyemo video tag ifite uburyo bwo kwihutisha isoma (preload) */}
              <video 
                controls 
                preload="metadata" 
                width="100%" 
                style={{ borderRadius: "8px" }}
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <h4>{videoItem.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TV;
