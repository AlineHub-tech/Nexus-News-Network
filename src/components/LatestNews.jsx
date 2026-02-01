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
        
        {/* DESKTOP LEFT COLUMN */}
        <div className="news-side-column">
          {leftNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="bbc-style" />
          ))}
        </div>

        {/* CENTER SLIDER AREA */}
        <div className="slider-main-area">
          <div className="slider-track-box">
            {centerNews.map((post, index) => (
              <div 
                key={post._id} 
                className={`slide-unit ${index === currentSlide ? "active" : ""}`}
              >
                <NewsCard post={post} extraClass="is-slider-featured" />
              </div>
            ))}
          </div>
          <div className="slider-dots-nav">
            {centerNews.map((_, i) => (
              <span key={i} className={`dot-nav ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* DESKTOP RIGHT COLUMN */}
        <div className="news-side-column">
          {rightNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="bbc-style" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
