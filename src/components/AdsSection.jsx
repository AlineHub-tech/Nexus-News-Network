import React, { useState, useEffect } from "react";
import "../styles/AdsSection.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const AdsSection = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata Ads zifite Media (iburyo) n'izifite Text gusa (ibumoso)
  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 5) || [];
  const textAds = ads?.slice(0, 3) || []; // Fata 3 zambere zo ku ruhande rw'ibumoso

  // Slider Logic kuri Media Ads
  useEffect(() => {
    if (mediaAds.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediaAds.length);
      }, 4000); // Ihinduranya buri masegonda 4
      return () => clearInterval(timer);
    }
  }, [mediaAds.length]);

  if (!ads || ads.length === 0) return null;

  return (
    <div className="ads-section-main-wrapper">
      <h2 className="section-title">AMATANGAZO (Advertisements)</h2>
      
      <div className="ads-grid-layout">
        
        {/* LEFT SIDE: Text-Only Stack (3 Rows) */}
        <div className="ads-left-column">
          {textAds.map((ad) => (
            <div key={`text-${ad._id}`} className="text-ad-row">
              <span className="ad-tag">PROMOTED</span>
              <h4>{ad.title}</h4>
              <p>{ad.description}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Animated Media Slider */}
        <div className="ads-right-column">
          <div className="slider-viewport">
            {mediaAds.map((ad, index) => (
              <div 
                key={`media-${ad._id}`} 
                className={`slide-item ${index === currentSlide ? "active" : ""}`}
              >
                {ad.mediaType === 'image' ? (
                  <img src={`${API_BASE_URL}${ad.mediaUrl}`} alt={ad.title} />
                ) : (
                  <video autoPlay muted loop src={`${API_BASE_URL}${ad.mediaUrl}`} />
                )}
                <div className="slide-overlay">
                  <h3>{ad.title}</h3>
                </div>
              </div>
            ))}
          </div>
          {/* Slider Dots */}
          <div className="slider-dots">
            {mediaAds.map((_, i) => (
              <span key={i} className={`dot ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdsSection;
