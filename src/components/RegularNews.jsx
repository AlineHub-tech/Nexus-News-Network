import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext';

const RegularNews = ({ newsList }) => { 
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return <p className="regular-news-empty">Nta nkuru zindi zibonetse ubu.</p>;
  }

  // --- LOGIC IKOSOYE (Dynamic Slice) ---
  // Page 1: Ifata inkuru kuva ku ya 9 (index 8 kugeza kuri 30)
  // Page 2+: Ifata inkuru zose 30 uko zakabaye
  const displayList = currentPage === 1 ? newsList.slice(8) : newsList;

  // Gabanya inkuru zisigaye mu bice bibiri (Split Columns)
  const half = Math.ceil(displayList.length / 2);
  const leftColumn = displayList.slice(0, half);
  const rightColumn = displayList.slice(half);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="regular-news-section-container">
      <div className="section-title">
        <span className="badge">NEWS</span>
        <h2 className="title">IZINDI NKURU</h2>
        <div className="line"></div>
      </div>

      <div className="regular-news-main-wrapper">
        <div className="news-column">
          {leftColumn.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* Vertical divider igaragara gusa niba hari inkuru iburyo */}
        {rightColumn.length > 0 && <div className="vertical-divider"></div>}

        <div className="news-column">
          {rightColumn.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* PAGINATION SECTION */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pag-btn" 
            onClick={() => { if(currentPage > 1) { paginate(currentPage - 1); handleScrollToTop(); }}} 
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> PREV
          </button>
          
          <span className="page-info"> Page <strong>{currentPage}</strong> of {totalPages} </span>
          
          <button 
            className="pag-btn" 
            onClick={() => { if(currentPage < totalPages) { paginate(currentPage + 1); handleScrollToTop(); }}} 
            disabled={currentPage === totalPages}
          >
            NEXT <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegularNews;
