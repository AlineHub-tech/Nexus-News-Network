import React from "react";
import "../styles/TVSection.css";

const TV = ({ videos }) => { // Yakira 'videos' props
  if (!videos || videos.length === 0) {
    return (
        <div className="tv-section-container">
            <h2 className="section-title">TV Section</h2> 
            <div className="tv-section">Nta mashusho ya TV aboneka ubu.</div>;
        </div>
    );
  }

  // --- UMURONGO W'INGENZI WAKOSOWE HANO ---
  // Koresha Environment Variable VITE_API_URL iri muri Vercel Settings (https://url-ya-render.com)
  // Niba uri local development, ukoresha http://localhost:5000 (HTTP)
  const BASE_SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  // ----------------------------------------

  return (
    <div className="tv-section-container"> 
      <h2 className="section-title">AMASHUSHO(TV)</h2> 

      <div className="tv-section">
        {videos.map((videoItem) => (
          <div key={videoItem._id} className="tv-card">
            <video controls>
              {/* Dukoresha BASE_SERVER_URL nshya */}
              <source src={`${BASE_SERVER_URL}${videoItem.mediaUrl}`} type="video/mp4" />
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
