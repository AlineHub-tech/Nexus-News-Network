// src/components/PopularNews.jsx
import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import "../styles/PopularNews.css";

const PopularNews = ({ newsList }) => { 
  
  if (!newsList || newsList.length === 0) {
    return (
        <div className="popular-news-container">
            <h2 className="section-title">Trending News (8 Items)</h2>
            <p>Nta nkuru zikunzwe zibonetse.</p>
        </div>
    );
  }

  // Dukoresha inkuru 8 gusa (nubwo landing page yohereza 4)
  const trendingNews = newsList.slice(0, 8);


  return (
    <div className="popular-news-container">
      {/* Umutwe wa section hamwe na style twumvikanyeho */}
      <h2 className="section-title">INKURU ZIKUZWE(Trending News)</h2> 

      {/* Agace kanyerera nk'aka trending ticker */}
      <div className="popular-news-ticker-wrap">
        <div className="popular-news-ticker-move">
            {/* Dukoresha urutonde kabiri kugira ngo animation ikomeze nta gihagarara */}
            {trendingNews.map((post) => (
                <NewsCard key={post._id} post={post} /> 
            ))}
             {trendingNews.map((post) => (
                <NewsCard key={`${post._id}-clone`} post={post} /> 
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
