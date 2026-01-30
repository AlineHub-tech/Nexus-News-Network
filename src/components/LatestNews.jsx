import React from "react";
import NewsCard from "./NewsCard"; 
import "../styles/LatestNews.css"; // Styles nshya ziri hano

const LatestNews = ({ news }) => { 
  if (!news || news.length === 0) return <p>Loading latest news or no news available...</p>;

  return (
    // Dukoresha container imwe rya rusange
    <div className="latest-news-grid-container"> 
      {news.map((post) => (
        <div key={post._id} className="news-item-wrapper"> 
          <NewsCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default LatestNews;
