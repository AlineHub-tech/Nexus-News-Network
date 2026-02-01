import React from "react";
import NewsCard from "./NewsCard";
import "../styles/PopularNews.css";

const PopularNews = ({ newsList }) => { 
  
  // 1. Niba nta nkuru zihari, ntacyo kwerekana
  if (!newsList || newsList.length === 0) {
    return (
        <div className="popular-news-container">
            <div className="section-header">
                <span className="badge">Amakuru</span>
                <h2 className="title">ZAREBWE CYANE</h2>
                <div className="line"></div>
            </div>
            <p style={{ padding: '20px', textAlign: 'center' }}>Nta nkuru zibonetse.</p>
        </div>
    );
  }

  // 2. Gutoranya inkuru 10 zifite views nyinshi
  const trendingNews = [...newsList]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <section className="popular-news-container">
      {/* Section Header Design nshya */}
      <div className="section-header">
         <span className="badge">TOP 10</span>
         <h2 className="title">ZAREBWE CYANE</h2>
         <div className="line"></div>
      </div>

      {/* Ticker System */}
      <div className="ticker-viewport">
        <div className="ticker-track">
            {/* 1. Inkuru z'umwimerere */}
            {trendingNews.map((post, index) => (
                <div className="ticker-card-wrapper" key={`original-${post._id}-${index}`}>
                  <NewsCard post={post} /> 
                </div>
            ))}
            
            {/* 2. Clone (Izi nizo zituma animation ikomeza idahagarara) */}
            {trendingNews.map((post, index) => (
                <div className="ticker-card-wrapper" key={`clone-${post._id}-${index}`}>
                  <NewsCard post={post} /> 
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNews;
