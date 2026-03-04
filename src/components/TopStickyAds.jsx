import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];
  const textAds = ads?.filter(ad => ad.title).slice(0, 10) || [];

  useEffect(() => {
    const total = Math.max(mediaAds.length, textAds.length);
    if (total > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % total);
      }, 6000); 
      return () => clearInterval(timer);
    }
  }, [mediaAds.length, textAds.length]);

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    // Koresha https link ya backend yawe hano
    const base = "https://nexus-news-network-backend.onrender.com"; 
    return `${base}${url.startsWith('/') ? url : '/' + url}`;
  };

  if (!ads || ads.length === 0) return null;

  const currentMediaAd = mediaAds[currentSlide % mediaAds.length];
  const currentTextAd = textAds[currentSlide % textAds.length];

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-wrapper-flex">
        <div className="ad-media-part">
          {currentMediaAd && (
             <img src={getMediaUrl(currentMediaAd.mediaUrl)} alt="Nexus Ad" />
          )}
        </div>

        <div className="ad-vertical-divider"></div>

        <div className="ad-text-part">
          <span className="sponsored-label">PROMOTED</span>
          <h4 className="ad-title-full">{currentTextAd?.title}</h4>
          <div className="ad-desc-row">
            <p className="ad-full-desc">{currentTextAd?.description}</p>
            <a href={`tel:${currentTextAd?.description?.match(/\d+/)}`} className="call-btn-action">
              📞 CALL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStickyAds;
