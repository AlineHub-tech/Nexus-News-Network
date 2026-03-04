import React, { useState, useEffect } from "react";
import "../styles/TopStickyAds.css";

const TopStickyAds = ({ ads }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufilter ads zifite amakuru ahagije
  const validAds = ads?.filter(ad => ad.title || ad.mediaUrl) || [];

  useEffect(() => {
    if (validAds.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % validAds.length);
      }, 5000); 
      return () => clearInterval(timer);
    }
  }, [validAds.length]);

  if (validAds.length === 0) return null;

  const currentAd = validAds[currentSlide];
  
  // Gufata nimero mu buryo bwizewe
  const phoneMatch = currentAd?.description?.match(/07\d{8}/);
  const phoneNumber = phoneMatch ? phoneMatch[0] : "";

  return (
    <div className="top-sticky-ads-container">
      <div className="ad-wrapper-flex">
        {/* Ibumoso: Text Ads */}
        <div className="ad-text-part">
          <span className="sponsored-label">PROMOTED</span>
          <h4 className="ad-title-full">{currentAd?.title}</h4>
          <div className="ad-desc-row">
            <p className="ad-full-desc">{currentAd?.description}</p>
            {phoneNumber && (
              <a href={`tel:${phoneNumber}`} className="call-btn-action">
                📞 CALL
              </a>
            )}
          </div>
        </div>

        {/* Hagati: Line */}
        <div className="ad-vertical-divider"></div>

        {/* Iburyo: Image Ads */}
        <div className="ad-media-part">
          {currentAd?.mediaUrl && (
             <img src={currentAd.mediaUrl} alt="Ad" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopStickyAds;
