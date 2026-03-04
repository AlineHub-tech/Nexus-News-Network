import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata inkuru 8 gusa (2-4-2)
  const latest8 = news?.slice(0, 8) || [];
  
  const leftNews = latest8.slice(0, 2);   
  const centerNews = latest8.slice(2, 6); 
  const rightNews = latest8.slice(6, 8);  

  useEffect(() => {
    if (centerNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % centerNews.length);
      }, 5000); // 5 seconds is better for reading
      return () => clearInterval(timer);
    }
  }, [centerNews.length]);

  if (!news || news.length === 0) return null;

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid">
        
        {/* 1. LEFT COLUMN (2 Cards) */}
        <div className="news-side-column side-left">
          {leftNews.map((post) => (
            <div key={post._id} className="side-item-wrapper">
              <NewsCard post={post} />
            </div>
          ))}
        </div>

        {/* 2. MIDDLE COLUMN (Slider - 4 Cards) */}
        <div className="news-center-slider">
          <div className="slider-container">
            {centerNews.map((post, index) => (
              <div 
                key={post._id} 
                className={`slide-item ${index === currentSlide ? "active" : ""}`}
              >
                {/* 
                   IKI NICYO GIKEMURA KUZIMIRA: 
                   Koresha extraClass='featured-card' nk'uko biri muri CSS 
                */}
                <NewsCard post={post} extraClass="featured-card" />
              </div>
            ))}
          </div>
          
          <div className="slider-dots">
            {centerNews.map((_, i) => (
              <span key={i} className={`dot ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* 3. RIGHT COLUMN (2 Cards) */}
        <div className="news-side-column side-right">
          {rightNews.map((post) => (
            <div key={post._id} className="side-item-wrapper">
              <NewsCard post={post} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
