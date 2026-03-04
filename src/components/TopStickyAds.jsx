import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata Ads zifite amashusho (Photos/Videos)
  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];
  // Gufata Ads zifite amagambo gusa (cyangwa izo ari zo zose)
  const textAds = ads?.filter(ad => ad.title).slice(0, 10) || [];

  useEffect(() => {
    const total = Math.max(mediaAds.length, textAds.length);
    if (total > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % total);
      }, 5000); // Guhinduranya buri masegonda 5
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

  // Iki nicyo bituma ifoto n'amagambo bihinduranya (Slider logic)
  const currentMediaAd = mediaAds[currentSlide % mediaAds.length];
  const currentTextAd = textAds[currentSlide % textAds.length];

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-wrapper-flex">
        
        {/* IBURYO: PHOTO ADS (Yongerewe Size) */}
        <div className="ad-media-part">
          {currentMediaAd && (
            <div className="media-box-animation">
               {currentMediaAd.mediaType === 'video' ? (
                 <video autoPlay muted loop src={getMediaUrl(currentMediaAd.mediaUrl)} />
               ) : (
                 <img src={getMediaUrl(currentMediaAd.mediaUrl)} alt="Ad" />
               )}
            </div>
          )}
        </div>

        {/* HAGATI: VERTICAL LINE (Ihagaraye itandukanya impande zombi) */}
        <div className="ad-vertical-divider"></div>

        {/* IBUMOSO: TEXT ADS (Zihinduranya) */}
        <div className="ad-text-part">
          <div className="text-slide-animation">
            <span className="sponsored-label">PROMOTED</span>
            <h4 className="ad-title-limit">{currentTextAd?.title}</h4>
            <div className="ad-action-row">
               <p className="ad-desc-limit">{currentTextAd?.description?.substring(0, 45)}...</p>
               <a href={`tel:${currentTextAd?.description?.match(/\d+/)}`} className="call-btn-small">
                 📞 CALL
               </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopStickyAds;
