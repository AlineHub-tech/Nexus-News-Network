import React from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  // 1. Fata inkuru 8 za mbere gusa (Index 0 kugeza kuri 7)
  const latest8 = news ? news.slice(0, 8) : [];

  if (latest8.length === 0) return null;

  return (
    <section className="latest-news-section">
      {/* Title ya Section niba uyishaka (Optional) */}
      <div className="section-title">
        <span className="badge">LATEST</span>
        <h2 className="title">INKURU ZIGEZEHO</h2>
        <div className="line"></div>
      </div>

      <div className="news-ultra-grid">
        {latest8.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
