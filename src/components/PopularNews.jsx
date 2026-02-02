import React from "react";
import NewsCard from "./NewsCard";
import "../styles/PopularNews.css";

const PopularNews = ({ newsList }) => { 
  if (!newsList || newsList.length === 0) return null;

  // Fata inkuru 10 zifite views nyinshi
  const trendingNews = [...newsList]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <section className="popular-news-section">
        <div className="section-title">
        <span className="badge">TREND NEWS</span>
        <h2 className="title">INKURU ZIKUZWE</h2>
        <div className="line"></div>
      </div>

      <div className="ticker-container">
        <div className="ticker-track">
          {/* 1. Inkuru za mbere */}
          {trendingNews.map((post) => (
            <div className="ticker-item" key={`orig-${post._id}`}>
              <NewsCard post={post} /> 
            </div>
          ))}
          {/* 2. Clone zazo zituma loop idahagarara */}
          {trendingNews.map((post) => (
            <div className="ticker-item" key={`clone-${post._id}`}>
              <NewsCard post={post} /> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNews;


