import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fata inkuru 8 za mbere neza neza
  const latest8 = news?.slice(0, 8) || [];
  const leftNews = latest8.slice(0, 2);   // 2 Ibumoso
  const centerNews = latest8.slice(2, 6); // 4 Hagati (Slider)
  const rightNews = latest8.slice(6, 8);  // 2 Iburyo

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
        
        {/* LEFT: 2 news cards (One on top of another) */}
        <div className="news-side-column side-left">
          {leftNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="side-news-card" />
          ))}
        </div>

        {/* CENTER: 4 news cards in SLIDER */}
        <div className="news-center-slider">
          <div className="slider-container">
            {centerNews.map((post, index) => (
              <div key={post._id} className={`slide-item ${index === currentSlide ? "active" : ""}`}>
                <NewsCard post={post} extraClass="main-slider-card" />
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

        {/* RIGHT: 2 news cards (One on top of another) */}
        <div className="news-side-column side-right">
          {rightNews.map((post) => (
            <NewsCard key={post._id} post={post} extraClass="side-news-card" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
