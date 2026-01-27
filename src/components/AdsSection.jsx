// src/components/AdsSection.jsx
import React from "react";
import "../styles/AdsSection.css";

const AdsSection = ({ ads }) => { 
  if (!ads || ads.length === 0) {
    // Nabishize muri div ikikije byose kugira ngo style y'umutwe igaragare
    return (
        <div className="ads-section-container">
            <h2 className="section-title">Advertisements</h2>
            <div className="ads-section">Nta matangazo aboneka ubu.</div>;
        </div>
    );
  }

  const BASE_SERVER_URL = '//localhost:5000';

  return (
    // Nongeyeho container div ikikije byose kugira ngo umutwe ube hejuru ya grid
    <div className="ads-section-container">
      {/* Umutwe wa section hamwe na style twumvikanyeho */}
      <h2 className="section-title">AMATANGAZO(Advertisements)</h2>

      <div className="ads-section">
        {ads.map((ad, index) => (
          <div 
              key={ad._id} 
              className="ad-card"
              // Delay ituma ziza zikurikiranye nkuko biba kuri media atandukanye
              style={{ animationDelay: `${index * 0.1}s` }} 
          >
            {ad.mediaUrl && ad.mediaType === 'image' && (
              <img src={`${BASE_SERVER_URL}${ad.mediaUrl}`} alt={ad.title || "advertisement"} />
            )}
            {ad.mediaUrl && ad.mediaType === 'video' && (
              <video controls>
                  <source src={`${BASE_SERVER_URL}${ad.mediaUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
            )}
            <p>{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsSection;
