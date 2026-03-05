import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext';

const RegularNews = ({ newsList }) => { 
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return <p className="regular-news">Nta nkuru zisanzwe zibonetse ubu.</p>;
  }

  // Gabanya inkuru 16 mu bice bibiri (8 hino, 8 hirya)
  const leftColumnNews = newsList.slice(0, 8);
  const rightColumnNews = newsList.slice(8, 16);

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
        {/* COLUMN YA MBERE (8 Inkuru) */}
        <div className="news-column">
          {leftColumnNews.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* UMURONGO UGERA HASI (Vertical Divider) */}
        <div className="vertical-divider"></div>

        {/* COLUMN YA KABIRI (Izindi 8) */}
        <div className="news-column">
          {rightColumnNews.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button className="pag-btn" onClick={() => { if(currentPage > 1) { paginate(currentPage - 1); handleScrollToTop(); }}} disabled={currentPage === 1}>
            <i className="fas fa-chevron-left"></i> Prev
          </button>
          <span className="page-info"> Page <strong>{currentPage}</strong> of {totalPages} </span>
          <button className="pag-btn" onClick={() => { if(currentPage < totalPages) { paginate(currentPage + 1); handleScrollToTop(); }}} disabled={currentPage === totalPages}>
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegularNews;
