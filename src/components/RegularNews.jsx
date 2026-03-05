import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext';

const RegularNews = ({ newsList }) => { 
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return <p className="regular-news">Nta nkuru zisanzwe zibonetse ubu.</p>;
  }

  // 1. Fata inkuru zose guhera ku ya 9 (index 8) kugeza ku mpera ya newsList (30)
  const remainingNews = newsList.slice(8); 

  // 2. Gabanya izo nkuru mu bice bibiri bingana (urugero: 11 hino, 11 hirya niba ari 22)
  const half = Math.ceil(remainingNews.length / 2);
  const leftColumnNews = remainingNews.slice(0, half);
  const rightColumnNews = remainingNews.slice(half);

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
        {/* COLUMN YA MBERE (Ibumoso) */}
        <div className="news-column">
          {leftColumnNews.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* UMURONGO URI HAGATI */}
        <div className="vertical-divider"></div>

        {/* COLUMN YA KABIRI (Iburyo) */}
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
