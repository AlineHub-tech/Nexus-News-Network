import React from "react";
import "../styles/TVSection.css";

const TV = ({ videos }) => { // Yakira 'videos' props
  if (!videos || videos.length === 0) {
    // Nabishize muri div ikikije byose kugira ngo style y'umutwe igaragare
    return (
        <div className="tv-section-container">
            <h2 className="section-title">TV Section</h2> 
            <div className="tv-section">Nta mashusho ya TV aboneka ubu.</div>;
        </div>
    );
  }

  // URL yuzuye ya server (Root URL)
  const BASE_SERVER_URL = 'http://localhost:5000';

  return (
    // Nongeyeho container div ikikije byose kugira ngo umutwe ube hejuru ya grid
    <div className="tv-section-container"> 
      {/* Umutwe wa section hamwe na style twumvikanyeho */}
      <h2 className="section-title">AMASHUSHO(TV)</h2> 

      <div className="tv-section">
        {videos.map((videoItem) => (
          <div key={videoItem._id} className="tv-card">
            <video controls>
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
