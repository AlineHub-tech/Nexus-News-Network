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

// API BASE URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const Landing = () => {
  const { newsList, videosList, loading, error } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isAdsLoading, setIsAdsLoading] = useState(true);

  // Logic yo gukosora URL z'amafoto (Cloudinary vs Local)
  const formatMediaList = useCallback((list) => {
    if (!list) return [];
    return list.map(item => {
      let finalUrl = item.mediaUrl || "";
      if (finalUrl && !finalUrl.startsWith('http')) {
          const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
          const path = finalUrl.startsWith('/') ? finalUrl : '/' + finalUrl;
          finalUrl = `${base}${path}`;
      }
      return { ...item, mediaUrl: finalUrl };
    });
  }, []);

  // Fetch Ads binyuze kuri Public API
  useEffect(() => {
    const fetchAdsData = async () => {
        try {
            const adsRes = await axios.get(`${API_BASE_URL}/api/public/ads`);
            const formattedAds = adsRes.data.map(ad => {
                let url = ad.mediaUrl || "";
                if (url && !url.startsWith('http')) {
                    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
                    url = `${base}${url.startsWith('/') ? url : '/' + url}`;
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

  // Gutunganya amadata yose (Memoized)
  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  // Handle Loading & Errors
  if (loading || isAdsLoading) return <LoadingScreen />;

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
    <div className="landing-container" style={{ overflowX: "hidden", background: "#f4f4f4" }}>
      {/* 1. NAVBAR (Fixed top: 0) */}
      <Navbar />

      {/* 2. WRAPPER FOR STICKY ELEMENTS: 
          Ibi bituma ibintu byose byigerera hejuru bidatwikiriye content */}
      <div style={{ marginTop: "65px", position: "relative", zIndex: "500" }}>
          <TopStickyAds ads={ads} />
          
          {/* Trending Ticker munsi ya Ads neza */}
          <div style={{ position: "relative", zIndex: "100", background: "#000" }}>
             <TrendingTicker />
          </div>
      </div>

      {/* 3. MAIN CONTENT: 
          Nashyizemo marginTop na padding kugira ngo LATEST NEWS igaragara neza hagati */}
      <main className="main-content-layout" style={{ marginTop: "30px", paddingBottom: "50px" }}>
        
        {/* LATEST NEWS: Ifite grid 2-4-2 (Side-Slider-Side) */}
        <section className="latest-news-section-container" style={{ position: "relative", zIndex: "10" }}>
           <LatestNews news={latestNews8} />
        </section>

        {/* REGULAR NEWS SECTION */}
        <section className="regular-news-section" style={{ marginTop: "50px" }}>
          <RegularNews newsList={regularNewsSliced} />
        </section>

        {/* POPULAR NEWS SECTION */}
        <section className="popular-news-section" style={{ marginTop: "50px" }}>
          <PopularNews newsList={popularNewsSliced} />
        </section>

        {/* TV SECTION (One Column layout) */}
        <section className="tv-ads-grid" style={{ gridTemplateColumns: "1fr", marginTop: "50px" }}>
          <TV videos={formattedVideos} />
        </section>

      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;

