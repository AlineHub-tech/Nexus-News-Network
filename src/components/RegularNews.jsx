import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext';

const RegularNews = ({ newsList }) => { 
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return (
      <div className="regular-news-section-container">
        <div className="section-title">
          <span className="badge">NEW</span>
          <h2 className="title">IZINDI NKURU</h2>
          <div className="line"></div>
        </div>
        <p className="no-news">Nta nkuru zisanzwe zibonetse ubu.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  
  const handleNext = () => {
    if (currentPage < totalPages) {
        paginate(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
        paginate(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="regular-news-section-container">
      {/* SECTION TITLE IVUGURUYE */}
      <div className="section-title">
        <span className="badge">LATEST</span>
        <h2 className="title">IZINDI NKURU</h2>
        <div className="line"></div>
      </div>

      <div className="regular-news-grid">
        {newsList.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>

      {/* PAGINATION BUTTONS */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagi-btn" 
            onClick={handlePrev} 
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="pagi-info"> Page <strong>{currentPage}</strong> of {totalPages} </span>
          <button 
            className="pagi-btn" 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default RegularNews;
