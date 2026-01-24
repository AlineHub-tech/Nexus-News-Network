import React, { createContext, useEffect, useState, useMemo } from "react";
import axios from 'axios'; 

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [allMedia, setAllMedia] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); // Page iriho ubu
  const [articlesPerPage] = useState(30); // Inkuru 30 kuri buri page (nkuko wabisabye umubare munini)

  const API_URL = "http://localhost:5000/api"; 

  const switchLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // API ikigarura byose. Tugabanya mu Context.
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
      // Niba nta search, garura articles zose (tugabanya nyuma)
      return articlesOnly; 
    }
    // ... (Logic ya Search) ...
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
  // Kugabanya filteredArticles muri page ntoya kugirango zijye muri RegularNews
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  
  // newsList izaba inkuru ziri kuri page iriho ubu GUSA
  const paginatedNewsList = useMemo(() => 
    filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle), 
    [filteredArticles, indexOfFirstArticle, indexOfLastArticle]
  );

  // Function yoherejwe hanze kugira ngo component zihindure page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <NewsContext.Provider value={{
      searchQuery, setSearchQuery, language, switchLanguage,
      newsList: paginatedNewsList, // Hano niho haba impinduka ikomeye
      videosList: videosOnly,
      loading, error,
      // Ongeyeho ibya Pagination kugira ngo RegularNews ibone buttons
      currentPage,
      articlesPerPage,
      totalArticles: filteredArticles.length, // Umubare w'inkuru zose (nyuma ya search)
      paginate
    }}>
      {children}
    </NewsContext.Provider>
  );
};
