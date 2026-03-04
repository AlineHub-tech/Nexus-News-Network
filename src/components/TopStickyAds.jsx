import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "//localhost:5000";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];
  const textAds = ads?.filter(ad => ad.title).slice(0, 10) || [];

  useEffect(() => {
    const total = Math.max(mediaAds.length, textAds.length);
    if (total > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % total);
      }, 7000); // Nahezeho igihe kirekire gato (7s) ngo babone umwanya wo gusoma description yose
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
  const currentTextAd = textAds[currentSlide % textAds.length];

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-wrapper-flex">
        
        {/* IBURYO: PHOTO ADS */}
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

        {/* HAGATI: VERTICAL LINE */}
        <div className="ad-vertical-divider"></div>

        {/* IBUMOSO: TEXT ADS (Description isomeka neza) */}
        <div className="ad-text-part">
          <div className="text-slide-animation">
            <span className="sponsored-label">PROMOTED AD</span>
            <h4 className="ad-title-full">{currentTextAd?.title}</h4>
            <div className="ad-description-container">
               <p className="ad-full-desc">{currentTextAd?.description}</p>
               <a href={`tel:${currentTextAd?.description?.match(/\d+/)}`} className="call-btn-full">
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
