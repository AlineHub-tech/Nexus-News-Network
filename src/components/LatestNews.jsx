import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  const latest8 = news?.slice(0, 8) || [];
  const leftNews = latest8.slice(0, 2);   
  const centerNews = latest8.slice(2, 6); 
  const rightNews = latest8.slice(6, 8);  

  useEffect(() => {
    if (centerNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % centerNews.length);
      }, 4000); 
      return () => clearInterval(timer);
    }
  }, [centerNews.length]);

  if (latest8.length === 0) return null;

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid">
        
        {/* DESKTOP LEFT (2) */}
        <div className="news-side-column side-left">
          {leftNews.map((post) => (
            <div key={post._id} className="bbc-row-wrapper">
              <NewsCard post={post} extraClass="bbc-card-style" />
            </div>
          ))}
        </div>

        {/* CENTER SLIDER (4) */}
        <div className="news-center-slider">
          <div className="slider-track-container">
            {centerNews.map((post, index) => (
              <div 
                key={post._id} 
                className={`slide-item-fixed ${index === currentSlide ? "active" : ""}`}
              >
                <NewsCard post={post} extraClass="slider-card-full" />
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {centerNews.map((_, i) => (
              <span key={i} className={`dot ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* DESKTOP RIGHT (2) */}
        <div className="news-side-column side-right">
          {rightNews.map((post) => (
            <div key={post._id} className="bbc-row-wrapper">
              <NewsCard post={post} extraClass="bbc-card-style" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
