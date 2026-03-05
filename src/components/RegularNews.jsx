import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext';

const RegularNews = ({ newsList }) => { 
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return <div className="regular-news-empty">Nta nkuru zindi zihari ubu.</div>;
  }

  // --- LOGIC IKOSOYE ---
  // Niba turi kuri Page 1, kura 8 za mbere (Latest). Niba turi kuri Page > 1, erekana zose 30.
  const remainingNews = currentPage === 1 ? newsList.slice(8) : newsList;

  // Gabanya inkuru mu bice bibiri
  const half = Math.ceil(remainingNews.length / 2);
  const leftColumnNews = remainingNews.slice(0, half);
  const rightColumnNews = remainingNews.slice(half);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section className="regular-news-section-container">
      <div className="section-title">
        <span className="badge">NEWS</span>
        <h2 className="title">IZINDI NKURU</h2>
        <div className="line"></div>
      </div>

      <div className="regular-news-main-wrapper">
        <div className="news-column">
          {leftColumnNews.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* Umurongo ugaragara gusa niba hari inkuru mu kigice cy'iburyo */}
        {rightColumnNews.length > 0 && <div className="vertical-divider"></div>}

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
            PREV
          </button>
          <span className="page-info"> Page {currentPage} of {totalPages} </span>
          <button className="pag-btn" onClick={() => { if(currentPage < totalPages) { paginate(currentPage + 1); handleScrollToTop(); }}} disabled={currentPage === totalPages}>
            NEXT
          </button>
        </div>
      )}
    </section>
  );
};

export default RegularNews;
