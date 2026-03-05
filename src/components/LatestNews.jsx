import React from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  // Twatunganyije inkuru 8 gusa zifatanye
  const latest8 = news ? news.slice(0, 8) : [];

  if (latest8.length === 0) return null;

  return (
    <section className="latest-news-section">
      <div className="news-ultra-grid">
        {latest8.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
