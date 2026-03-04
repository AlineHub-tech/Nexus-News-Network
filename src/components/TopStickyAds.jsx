import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true); // Control animation

  const mediaAds = ads?.filter(ad => ad.mediaUrl).slice(0, 10) || [];
  const textAds = ads?.filter(ad => ad.title).slice(0, 10) || [];

  useEffect(() => {
    const total = Math.max(mediaAds.length, textAds.length);
    if (total > 0) {
      const timer = setInterval(() => {
        setFade(false); // Start fading out
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % total);
          setFade(true); // Fade back in
        }, 500); // Wait for fade out
      }, 6000); 
      return () => clearInterval(timer);
    }
  }, [mediaAds.length, textAds.length]);

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://nexus-news-network-backend.onrender.com${url.startsWith('/') ? url : '/' + url}`;
  };

  if (!ads || ads.length === 0) return null;

  const currentMediaAd = mediaAds[currentSlide % mediaAds.length];
  const currentTextAd = textAds[currentSlide % textAds.length];
  
  // Extract phone number properly (safely)
  const phoneNumber = currentTextAd?.description?.replace(/\D/g, '') || "";

  return (
    <div className="top-sticky-ads-container">
      <div className={`ad-wrapper-flex ${fade ? 'fade-in' : 'fade-out'}`}>
        
        {/* Ibumoso: Text (Niko wavuze ko client abishaka) */}
        <div className="ad-text-part">
          <span className="sponsored-label">SPONSORED</span>
          <h4 className="ad-title-full">{currentTextAd?.title}</h4>
          <p className="ad-full-desc text-truncate">{currentTextAd?.description}</p>
          {phoneNumber && (
            <a href={`tel:${phoneNumber}`} className="call-btn-action">
              📞 Call Now
            </a>
          )}
        </div>

        {/* Hagati: Vertical Line */}
        <div className="ad-vertical-divider"></div>

        {/* Iburyo: Photo */}
        <div className="ad-media-part">
          {currentMediaAd && (
             <img src={getMediaUrl(currentMediaAd.mediaUrl)} alt="Ad" loading="lazy" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopStickyAds;
