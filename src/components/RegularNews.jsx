import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import "../styles/RegularNews.css";
import { NewsContext } from '../context/NewsContext'; // Import Context yo kubona pagination

const RegularNews = ({ newsList }) => { 
  // Dukuye amakuru ya pagination muri Context
  const { paginate, currentPage, totalArticles, articlesPerPage } = useContext(NewsContext);

  if (!newsList || newsList.length === 0) {
    return <p className="regular-news">Nta nkuru zisanzwe zibonetse ubu.</p>;
  }

  // Kumenya umubare wa pages zose (total pages)
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  
  const handleNext = () => {
    if (currentPage < totalPages) {
        paginate(currentPage + 1);
        window.scrollTo(0, 0); // Gusikurira hejuru page ihindutse
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
        paginate(currentPage - 1);
        window.scrollTo(0, 0); // Gusikurira hejuru page ihindutse
    }
  };

  return (
    <div className="regular-news-section-container">
        <div className="popular-news-container">
            <div className="section-header">
                <span className="badge">Amakuru</span>
                <h2 className="title">IZINDI NKURU </h2>
                <div className="line"></div>
            </div>
            <p style={{ padding: '20px', textAlign: 'center' }}>Nta nkuru zibonetse.</p>
        </div>

      <div className="regular-news-grid">
        {newsList.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>

      {/* SECTION YA PAGINATION BUTTONS */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RegularNews;
