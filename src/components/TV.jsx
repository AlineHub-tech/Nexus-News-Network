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

  const BASE_SERVER_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

  // Function itunganya URL (ikoresha ya logic ya AdminDashboard)
  const getMediaUrl = (mediaUrl) => {
    if (mediaUrl && mediaUrl.startsWith('http')) {
        return mediaUrl; // Niba ari Cloudinary (URL yuzuye)
    }
    // Niba ari file ya kera yo kuri local server
    const base = BASE_SERVER_URL.endsWith('/') ? BASE_SERVER_URL.slice(0, -1) : BASE_SERVER_URL;
    const media = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return `${base}${media}`;
  };

  return (
    <div className="tv-section-container"> 
      <h2 className="section-title">AMASHUSHO(TV)</h2> 

      <div className="tv-section">
        {videos.map((videoItem) => (
          <div key={videoItem._id} className="tv-card">
            {/* Koresha getMediaUrl hano munsi */}
            <video controls key={videoItem.mediaUrl}>
              <source src={getMediaUrl(videoItem.mediaUrl)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h4>{videoItem.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TV;
