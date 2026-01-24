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

  // UKO WANOGEJE URL MURI VITE: Koresha import.meta.env.VITE_APP_[IZINA_RYAWE]
  // Genzura ko muri Vercel Environment Variables wishyuye 'VITE_APP_API_URL'
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api"; 

  const switchLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Console log igufasha kumenya URL ikoreshwa muri Vercel Logs
        console.log(`Fetching articles from: ${API_URL}/public/articles`); 
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
        setError(`Habaye ikibazo: ${err.message}`); 
        setLoading(false);
      }
    };
    fetchArticles();
  }, [API_URL]); // Ongeyeho API_URL muri dependencies bya useEffect

  // LOGIC NSESHA: Kugabanyamo ibice bibiri: Inkuru gusa (images) n'Amashusho gusa (videos)
  const articlesOnly = useMemo(() => 
    allMedia.filter(item => item.mediaType === 'image'), [allMedia]
  );
  const videosOnly = useMemo(() => 
    allMedia.filter(item => item.mediaType === 'video'), [allMedia]
  );
  
  // Logic ya Search ikora kuri 'articlesOnly' (Inkuru gusa)
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
  
  // LOGIC YA PAGINATION:
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
