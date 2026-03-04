import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import "../styles/Landing.css";
import LatestNews from "../components/LatestNews";
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import TV from "../components/TV";
import TopStickyAds from "../components/TopStickyAds"; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingTicker from '../components/TrendingTicker';
import LoadingScreen from "../components/LoadingScreen";
import { NewsContext } from '../context/NewsContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nexus-news-network-backend.onrender.com';

const Landing = () => {
  const { newsList, videosList, loading, error } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isAdsLoading, setIsAdsLoading] = useState(true);

  const formatMediaList = useCallback((list) => {
    if (!list || list.length === 0) return [];
    return list.map(item => {
      let finalUrl = item.mediaUrl || "";
      if (finalUrl && !finalUrl.startsWith('http')) {
          const base = API_BASE_URL.replace(/\/+$/, "");
          const path = finalUrl.replace(/^\/+/, "");
          finalUrl = `${base}/${path}`;
      }
      return { ...item, mediaUrl: finalUrl };
    });
  }, []);

  useEffect(() => {
    const fetchAdsData = async () => {
        try {
            const adsRes = await axios.get(`${API_BASE_URL}/api/public/ads`);
            setAds(adsRes.data);
        } catch (err) {
            console.error("Error fetching ads:", err.message);
        } finally {
            setIsAdsLoading(false);
        }
    };
    fetchAdsData();
  }, []);

  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  if (loading || isAdsLoading) return <LoadingScreen />;

  if (error) return (
    <div className="landing-error-page">
      <Navbar />
      <div className="error-container">
        <h2>Oops! Habaye ikibazo.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="landing-container">
      {/* HEADER SECTION - IBI NIBYO BIGUMA HEJURU ARIKO BIDAPFUKA INKURU */}
      <header className="main-sticky-header">
        <Navbar />
        <TopStickyAds ads={ads} />
        <TrendingTicker />
      </header>

      {/* MAIN CONTENT - INKURU ZITANGIRIRA MUNSI YA HEADER NEZA */}
      <main className="main-content-layout">
        <section className="latest-news-section-container">
           <LatestNews news={latestNews8} />
        </section>

        <section className="regular-news-section">
          <RegularNews newsList={regularNewsSliced} />
        </section>

        <section className="popular-news-section">
          <PopularNews newsList={popularNewsSliced} />
        </section>

        <section className="tv-ads-grid">
          <TV videos={formattedVideos} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
