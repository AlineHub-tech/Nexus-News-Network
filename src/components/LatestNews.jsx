import React from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  // Twizere ko twakiriye inkuru 8 gusa
  const latest8 = news ? news.slice(0, 8) : [];

  if (latest8.length === 0) {
    return <div className="news-loading">Loading news...</div>;
  }

  return (
    <section className="latest-news-wrapper">
      <div className="news-container-grid">
        {latest8.map((post) => (
          <div key={post._id} className="news-card-item">
            <NewsCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
