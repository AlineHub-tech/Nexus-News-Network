import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gufata inkuru 8 gusa nk'uko ubishaka
  const latest8 = news?.slice(0, 8) || [];
  
  // Kugabanya inkuru mu bice 3
  const leftNews = latest8.slice(0, 2);   // Inkuru 1-2
  const centerNews = latest8.slice(2, 6); // Inkuru 3-6 (Slider)
  const rightNews = latest8.slice(6, 8);  // Inkuru 7-8

  // Logic ya Animation Slider (Hagati)
  useEffect(() => {
    if (centerNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % centerNews.length);
      }, 4000); // Ihinduranya buri masegonda 4
      return () => clearInterval(timer);
    }
  }, [centerNews.length]);

  if (!news || news.length === 0) return <div className="news-loading">Pakingira amakuru...</div>;

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid">
        
        {/* LEFT COLUMN: 2 News Items */}
        <div className="news-side-column left-side">
          {leftNews.map((post) => (
            <div key={post._id} className="side-item-wrapper">
              <NewsCard post={post} />
            </div>
          ))}
        </div>

        {/* MIDDLE COLUMN: 4 News Slider Animation */}
        <div className="news-center-slider">
          <div className="slider-container">
            {centerNews.map((post, index) => (
              <div 
                key={post._id} 
                className={`slide-item ${index === currentSlide ? "active" : ""}`}
              >
                <NewsCard post={post} extraClass="featured-card" />
              </div>
            ))}
          </div>
          {/* Slider Dots */}
          <div className="slider-indicators">
            {centerNews.map((_, i) => (
              <span key={i} className={`indicator ${i === currentSlide ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: 2 News Items */}
        <div className="news-side-column right-side">
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

