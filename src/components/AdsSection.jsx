import React, { useState, useEffect } from "react";
import "../styles/AdsSection.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const AdsSection = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata Ads zifite Placement ya 'slider' cyangwa ifite mediaUrl
  const mediaAds = ads?.filter(ad => ad.placement === "slider" || ad.mediaUrl).slice(0, 5) || [];
  
  // Gufata Ads zifite Placement ya 'sidebar' cyangwa izitambitse inyandiko gusa
  const textAds = ads?.filter(ad => ad.placement === "sidebar" || !ad.mediaUrl).slice(0, 3) || [];

  useEffect(() => {
    if (mediaAds.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediaAds.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [mediaAds.length]);

  // Iki ni cyo gice cy'ingenzi cyakosowe kugira ngo amafoto agaragare
  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url; // Niba ari Cloudinary (itangizwa na http)
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}${url.startsWith('/') ? url : '/' + url}`; // Niba ari local server
  };

  if (!ads || ads.length === 0) return null;

  return (
    <div className="ads-section-main-wrapper">
      <h2 className="section-title">AMATANGAZO (Advertisements)</h2>
      
      <div className="ads-grid-layout">
        
        {/* LEFT SIDE: Text-Only Stack */}
        <div className="ads-left-column">
          {textAds.length === 0 ? <p className="no-ads">No text ads available</p> : 
            textAds.map((ad) => (
              <div key={`text-${ad._id}`} className="text-ad-row">
                <span className="ad-tag">PROMOTED</span>
                <h4>{ad.title}</h4>
                <p>{ad.description}</p>
              </div>
            ))
          }
        </div>

        {/* RIGHT SIDE: Animated Media Slider */}
        <div className="ads-right-column">
          <div className="slider-viewport">
            {mediaAds.length === 0 ? <div className="no-media">No media ads</div> : 
              mediaAds.map((ad, index) => (
                <div 
                  key={`media-${ad._id}`} 
                  className={`slide-item ${index === currentSlide ? "active" : ""}`}
                >
                  {ad.mediaType === 'video' ? (
                    <video autoPlay muted loop src={getMediaUrl(ad.mediaUrl)} />
                  ) : (
                    <img src={getMediaUrl(ad.mediaUrl)} alt={ad.title} />
                  )}
                  <div className="slide-overlay">
                    <h3>{ad.title}</h3>
                  </div>
                </div>
              ))
            }
          </div>
          
          {mediaAds.length > 1 && (
            <div className="slider-dots">
              {mediaAds.map((_, i) => (
                <span key={i} className={`dot ${i === currentSlide ? "active" : ""}`} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdsSection;
