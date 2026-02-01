import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fata inkuru 8 za mbere
  const latest8 = news?.slice(0, 8) || [];
  
  const leftNews = latest8.slice(0, 2);   // 2 Left
  const centerNews = latest8.slice(2, 6); // 4 Slider
  const rightNews = latest8.slice(6, 8);  // 2 Right

  useEffect(() => {
    if (centerNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % centerNews.length);
      }, 4000); 
      return () => clearInterval(timer);
    }
  }, [centerNews.length]);

  if (!news || news.length === 0) return <div className="news-loading">Loading...</div>;

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid">
        
        {/* LEFT COLUMN (2 Cards) */}
        <div className="news-side-column side-left">
          {leftNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="side-horizontal" />
          ))}
        </div>

        {/* CENTER SLIDER (4 Cards) */}
        <div className="news-center-slider">
          <div className="slider-container">
            {centerNews.map((post, index) => (
              <div key={post._id} className={`slide-item ${index === currentSlide ? "active" : ""}`}>
                <NewsCard post={post} extraClass="featured-card" />
              </div>
            ))}
          </div>
          <div className="slider-indicators">
            {centerNews.map((_, i) => (
              <span key={i} className={`indicator ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (2 Cards) */}
        <div className="news-side-column side-right">
          {rightNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="side-horizontal" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
