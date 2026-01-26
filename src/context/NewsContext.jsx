import React, { createContext, useEffect, useState, useMemo } from "react";
import axios from 'axios';

export const NewsContext = createContext();

// Dukoresha VITE_API_URL itazagira slash ku iherezo muri Vercel Settings
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Hano nta /api ku iherezo

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(30);


  const switchLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        // HANO NIHO HAKOSOWE: Adiresi yose yanditswe neza (Api endpoint/public/articles)
        // Iyi URL ubu izakora neza Vercel settings zose:
        const res = await axios.get(`${API_BASE_URL}/api/public/articles`);

        if (Array.isArray(res.data)) {
            setAllMedia(res.data);
        } else {
            console.error("API did not return an array of articles.");
            setAllMedia([]);
            setError("API ntiyatanze amakuru ateye neza.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles in context:", err.message); // Ubutumwa burambuye
        setError("Habaye ikibazo cyo guhuza na server (CORS/Connection refused).");
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // ... (Amakode asigaye yose ni amwe, yita kuri filtering na pagination) ...

  const articlesOnly = useMemo(() =>
    allMedia.filter(item => item.mediaType === 'image'), [allMedia]
  );
  const videosOnly = useMemo(() =>
    allMedia.filter(item => item.mediaType === 'video'), [allMedia]
  );
    const filteredArticles = useMemo(() => {
    if (!searchQuery) {
      return articlesOnly;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return articlesOnly.filter(article => {
      const title = article.title || "";
      const summary = article.summary || "";
      const category = article.category || "";
      return (
        title.toLowerCase().includes(lowercasedQuery) ||
        summary.toLowerCase().includes(lowercasedQuery) ||
        category.toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [articlesOnly, searchQuery]);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const paginatedNewsList = useMemo(() =>
    filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle),
    [filteredArticles, indexOfFirstArticle, indexOfLastArticle]
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <NewsContext.Provider value={{
      searchQuery, setSearchQuery, language, switchLanguage,
      newsList: paginatedNewsList,
      videosList: videosOnly,
      loading, error,
        currentPage,
      articlesPerPage,
      totalArticles: filteredArticles.length,
      paginate
    }}>
      {children}
    </NewsContext.Provider>
  );
};
