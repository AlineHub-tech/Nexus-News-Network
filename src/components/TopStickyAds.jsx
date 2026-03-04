import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata Ads zifite ifoto/video
  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];
  // Gufata Ads zifite amagambo gusa (cyangwa izo ari zo zose)
  const textAds = ads?.filter(ad => ad.title).slice(0, 10) || [];

  useEffect(() => {
    const total = Math.max(mediaAds.length, textAds.length);
    if (total > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % total);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [mediaAds.length, textAds.length]);

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${base}${url.startsWith('/') ? url : '/' + url}`;
  };

  if (!ads || ads.length === 0) return null;

  const currentMediaAd = mediaAds[currentSlide % mediaAds.length];
  const currentTextAd = textAds[(currentSlide + 1) % textAds.length]; // Slide itandukanye gato

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-wrapper-flex">
        
        {/* LEFT: PHOTO ADS (Size yongerewe) */}
        <div className="ad-media-part">
          {currentMediaAd?.mediaUrl && (
            <div className="media-box">
               <img src={getMediaUrl(currentMediaAd.mediaUrl)} alt="Ads" />
               <div className="media-info-overlay">
                  <span>{currentMediaAd.title}</span>
               </div>
            </div>
          )}
        </div>

        {/* MIDDLE: VERTICAL LINE (Ihagaraye) */}
        <div className="ad-vertical-divider"></div>

        {/* RIGHT: TEXT ADS (Zihinduranya) */}
        <div className="ad-text-part">
          <span className="sponsored-label">PROMOTED</span>
          <h4 className="slide-up-animation">{currentTextAd?.title}</h4>
          <div className="ad-actions-row">
             <p>{currentTextAd?.description?.substring(0, 40)}...</p>
             <a href={`tel:${currentTextAd?.description?.match(/\d+/)}`} className="call-now-small">
               📞 CALL
             </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopStickyAds;
