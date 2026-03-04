import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import "../styles/Landing.css";
// Components
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

// API BASE URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const Landing = () => {
  const { newsList, videosList, loading, error } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isAdsLoading, setIsAdsLoading] = useState(true);

  // Gukosora URL z'amafoto (Media URL Formatter)
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

  // Fetch Ads muri useEffect
  useEffect(() => {
    const fetchAdsData = async () => {
        try {
            const adsRes = await axios.get(`${API_BASE_URL}/api/public/ads`);
            // Format ads media URLs properly
            const formattedAds = adsRes.data.map(ad => {
                let url = ad.mediaUrl || "";
                if (url && !url.startsWith('http')) {
                    const base = API_BASE_URL.replace(/\/+$/, "");
                    url = `${base}/${url.startsWith('/') ? url : '/' + url}`;
                }
                return { ...ad, mediaUrl: url };
            });
            setAds(formattedAds);
        } catch (err) {
            console.error("Error fetching ads:", err.message);
        } finally {
            setIsAdsLoading(false);
        }
    };
    fetchAdsData();
  }, []);

  // Gutunganya inkuru zose (Memoized)
  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  // Loading Screen
  if (loading || isAdsLoading) {
    return <LoadingScreen />;
  }

  // Error Handling
  if (error) {
    return (
      <div className="landing-error-page">
        <Navbar />
        <div className="error-container">
          <h2>Oops! Habaye ikibazo.</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Ongera ugerageze</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="landing-container">
      {/* 1. STICKY HEADER SECTION (Navbar -> Ads -> Ticker) */}
      <header className="main-sticky-header">
        <Navbar />
        <TopStickyAds ads={ads} />
        <TrendingTicker />
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="main-content-layout">
        {/* LatestNews section izisunika hasi neza bityo Slide igaragare 100% */}
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
          {/* Gufatanya TV na AdsSection niba ubishaka hasi nanone */}
          {/* <AdsSection ads={ads} /> */}
        </section>
      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;
