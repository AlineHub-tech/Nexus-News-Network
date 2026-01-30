import React from "react";
import NewsCard from "./NewsCard";
import "../styles/PopularNews.css";

const PopularNews = ({ newsList }) => { 
  
  if (!newsList || newsList.length === 0) {
    return (
        <div className="popular-news-container">
            <h2 className="section-title">INKURU ZIKUNZWE (Popular News)</h2>
            <p>Nta nkuru zibonetse.</p>
        </div>
    );
  }

  // 1. Tondika inkuru hashingiwe ku zarebwe cyane (views)
  // 2. Fata inkuru 8 za mbere zifite views nyinshi
  const trendingNews = [...newsList]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 8);

  return (
    <div className="popular-news-container">
      <h2 className="section-title">INKURU ZAREBWE CYANE (Most Viewed)</h2> 

      <div className="popular-news-ticker-wrap">
        <div className="popular-news-ticker-move">
            {trendingNews.map((post) => (
                <NewsCard key={post._id} post={post} /> 
            ))}
            {/* Clone kugira ngo animation ikomeze (loop) */}
            {trendingNews.map((post) => (
                <NewsCard key={`${post._id}-clone`} post={post} /> 
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
