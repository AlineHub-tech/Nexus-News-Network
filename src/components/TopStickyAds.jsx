import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Gufata gusa Ads zifite ifoto/video (mediaUrl) kugira ngo zize hejuru
  const sliderAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];

  useEffect(() => {
    if (sliderAds.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderAds.length);
      }, 5000); // Ihindura buri masegonda 5
      return () => clearInterval(timer);
    }
  }, [sliderAds.length]);

  // Logic yawe isanzwe yo gufata URL (Kugira ngo ifoto igaragare)
  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}${url.startsWith('/') ? url : '/' + url}`;
  };

  if (sliderAds.length === 0) return null;

  const currentAd = sliderAds[currentSlide];

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-content-box">
        {/* IFOTO/VIDEO IBURYO */}
        <div className="ad-media-thumb">
          {currentAd.mediaType === 'video' ? (
            <video autoPlay muted loop src={getMediaUrl(currentAd.mediaUrl)} />
          ) : (
            <img src={getMediaUrl(currentAd.mediaUrl)} alt={currentAd.title} />
          )}
        </div>
        
        {/* IZINA N'AMAGAMBO HAGATI */}
        <div className="ad-details">
          <span className="ad-sponsored-tag">SPONSORED AD</span>
          <h4>{currentAd.title}</h4>
        </div>

        {/* CALL BUTTON IBURYO (Niba hari numero muri description) */}
        <div className="ad-action">
           <a href={`tel:${currentAd.description || '0780000000'}`} className="ad-call-btn">
             📞 CALL
           </a>
        </div>
      </div>
    </div>
  );
};

export default TopStickyAds;
