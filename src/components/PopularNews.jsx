import React from "react";
import NewsCard from "./NewsCard";
import "../styles/PopularNews.css";

const PopularNews = ({ newsList }) => { 
  
  // Niba nta nkuru zihari, ntacyo kwerekana (cyangwa erekana ubutumwa)
  if (!newsList || newsList.length === 0) {
    return (
        <div className="popular-news-container">
            <div className="section-title">
                <h2>INKURU ZIKUNZWE</h2>
            </div>
            <p className="no-news-msg">Nta nkuru zibonetse kuri uyu munyutsi.</p>
        </div>
    );
  }

  // 1. Tondika inkuru hashingiwe ku zarebwe cyane (views)
  // 2. Fata inkuru 10 za mbere zifite views nyinshi (Twayongereye kugira ngo ticker itumbuke)
  const trendingNews = [...newsList]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <section className="popular-news-section">
      {/* Section Title ifite Design nshya */}
      <div className="section-title">
        <h2>INKURU ZAREBWE CYANE</h2>
      </div>

      <div className="popular-news-ticker-container">
        <div className="popular-news-ticker-track">
            {/* 
               Gukoresha inshuro ebyiri (Double Map) bituma ticker ikora "Seamless loop" 
               nta gucikagurika iyo igeze mu mpera.
            */}
            {trendingNews.map((post, index) => (
                <div className="ticker-item" key={`${post._id}-${index}`}>
                  <NewsCard post={post} /> 
                </div>
            ))}
            
            {/* Clone: Izi nizo zituma animation ikomeza idahagarara */}
            {trendingNews.map((post, index) => (
                <div className="ticker-item" key={`${post._id}-clone-${index}`}>
                  <NewsCard post={post} /> 
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNews;
