import React, { createContext, useEffect, useState } from "react";
import { API_BASE } from "../config";
export const NewsContext = createContext();

// const API_BASE = process.env.REACT_APP_API || "http://localhost/nexus_api";

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [pending, setPending] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    fetchApproved();
    fetchPending();
    fetchAds();
  }, []);

  const fetchApproved = async () => {
    const res = await fetch(`${API_BASE}/get_approved_news.php`);
    const data = await res.json();
    setNews(data);
  };

  const fetchPending = async () => {
    const res = await fetch(`${API_BASE}/get_pending_news.php`);
    const data = await res.json();
    setPending(data);
  };

  const fetchAds = async () => {
    const res = await fetch(`${API_BASE}/get_ads.php`);
    const data = await res.json();
    setAds(data);
  };

  // Author/Admin add news (FormData with file)
  const addNews = async (form, file=null) => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("body", form.body);
    fd.append("category", form.category);
    fd.append("author", form.author || "Admin");
    fd.append("type", form.isVideo ? "video" : "image");
    if (form.isVideo && form.videoUrl) fd.append("video_url", form.videoUrl);
    if (!form.isVideo && file) fd.append("image", file);

    const res = await fetch(`${API_BASE}/add_news.php, { method: "POST", body: fd }`);
    const json = await res.json();
    if (json.success) {
      await fetchPending();
      return true;
    }
    return false;
  };

  const approveNews = async (id) => {
    const res = await fetch(`${API_BASE}/approve_news.php, { method: "POST", body: new URLSearchParams({ id }) }`);
    await fetchPending();
    await fetchApproved();
  };

  const rejectNews = async (id) => {
    await fetch(`${API_BASE}/reject_news.php, { method: "POST", body: new URLSearchParams({ id }) }`);
    await fetchPending();
  };

  const deleteNews = async (id) => {
    await fetch(`${API_BASE}/delete_news.php, { method: "POST", body: new URLSearchParams({ id }) }`);
    await fetchApproved();
    await fetchPending();
  };

  // Ads
  const addAd = async (form, file=null) => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description || "");
    fd.append("type", form.isVideo ? "video" : "image");
    if (form.isVideo && form.videoUrl) fd.append("video_url", form.videoUrl);
    if (!form.isVideo && file) fd.append("image", file);

    const res = await fetch(`${API_BASE}/add_ad.php, { method: "POST", body: fd }`);
    const json = await res.json();
    if (json.success) {
      await fetchAds();
      return true;
    }
    return false;
  };

  const deleteAd = async (id) => {
    await fetch(`${API_BASE}/delete_ad.php, { method: "POST", body: new URLSearchParams({ id }) }`);
    await fetchAds();
  };

  const switchLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const filteredNews = news.filter(n => {
    const q = (searchQuery || "").toLowerCase();
    return !q || n.title.toLowerCase().includes(q) || n.author.toLowerCase().includes(q) || n.category.toLowerCase().includes(q);
  });

  return (
    <NewsContext.Provider value={{
      news: filteredNews,
      rawNews: news,
      pending,
      ads,
      addNews, approveNews, rejectNews, deleteNews,
      addAd, deleteAd,
      fetchApproved, fetchPending, fetchAds,
      searchQuery, setSearchQuery,
      language, switchLanguage
    }}>
      {children}
    </NewsContext.Provider>
  );
};

