import React, { createContext, useEffect, useState, useMemo } from "react";
import axios from 'axios'; 

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [allMedia, setAllMedia] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [articlesPerPage] = useState(30); 

  // --- UMURONGO W'INGENZI WAKOSOWE HANO ---
  // Dukoresha Environment Variable VITE_API_URL, itangira na https:// kuri Vercel (Production)
  // Niba uri local development, dukoresha http://localhost:5000/api gusa (HTTP)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  // ----------------------------------------

  const switchLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
         const res = await axios.get(`${API_URL}/public/articles`); 
        if (Array.isArray(res.data)) {
            setAllMedia(res.data);
        } else {
            console.error("API did not return an array of articles.");
            setAllMedia([]);
            setError("API ntiyatanze amakuru ateye neza.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles in context:", err);
        setError("Habaye ikibazo cyo guhuza na server (CORS/Connection refused).");
        setLoading(false);
      }
    };
    fetchArticles();
  }, []); 

  // ... (Amakode asigaye yose ni amwe) ...

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
