import React from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css";

const LatestNews = ({ news }) => { 
  // Niba nta nkuru zihari, funga agace kose
  if (!news || news.length === 0) return null;

  // Gufata inkuru 8 gusa nk'uko ubishaka
  const latest8 = news.slice(0, 8);

  return (
    <div className="latest-news-section-wrapper">
      <div className="latest-news-grid-display">
        {latest8.map((post) => (
          <div key={post._id} className="latest-post-item">
            <NewsCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
