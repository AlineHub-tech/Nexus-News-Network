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

  // Inline styles to force absolute positioning and visibility
  const slideStyle = (index) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: index === currentSlide ? 1 : 0,
    visibility: index === currentSlide ? 'visible' : 'hidden',
    transition: 'opacity 1s ease-in-out',
    zIndex: index === currentSlide ? 10 : 1
  });

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid">
        
        {/* LEFT COLUMN (2 news) */}
        <div className="news-side-column side-column-left">
          {leftNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="bbc-mobile-row" />
          ))}
        </div>

        {/* CENTER SLIDER (4 news sliding) */}
        <div className="news-center-slider">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {centerNews.map((post, index) => (
              <div key={post._id} style={slideStyle(index)}>
                <NewsCard post={post} extraClass="slider-full-card" />
              </div>
            ))}
          </div>
          <div className="slider-indicators">
            {centerNews.map((_, i) => (
              <span 
                key={i} 
                className={`indicator ${i === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (2 news) */}
        <div className="news-side-column side-column-right">
          {rightNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="bbc-mobile-row" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
