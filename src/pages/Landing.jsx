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

  // Fetch Ads
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

  // Gutunganya amadata (Memoized)
  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  if (loading || isAdsLoading) {
    return <LoadingScreen />;
  }

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
    <div className="landing-container" style={{ overflowX: "hidden" }}>
      {/* 1. NAVBAR (Z-index: 1000 muri CSS) */}
      <Navbar />

      {/* 2. TOP STICKY ADS (Z-index: 990 muri CSS) */}
      <TopStickyAds ads={ads} />

      {/* 3. TRENDING TICKER WRAPPER: Ibi bituma Trending itihisha munsi ya Ads */}
      <div style={{ 
        position: "relative", 
        zIndex: "100", 
        background: "#fff",
        borderBottom: "1px solid #eee" 
      }}>
         <TrendingTicker />
      </div>

      <main className="main-content-layout" style={{ marginTop: "20px" }}>
        {/* 4. LATEST NEWS (Side-Slider-Side layout) */}
        <section className="latest-news-section-container">
           {/* IKI NICYO CYARI KIBURA: LatestNews ikoresha grid ya 2-4-2 */}
           <LatestNews news={latestNews8} />
        </section>

        {/* 5. REGULAR NEWS */}
        <section className="regular-news-section" style={{ marginTop: "40px" }}>
          <RegularNews newsList={regularNewsSliced} />
        </section>

        {/* 6. POPULAR NEWS */}
        <section className="popular-news-section" style={{ marginTop: "40px" }}>
          <PopularNews newsList={popularNewsSliced} />
        </section>

        {/* 7. TV SECTION (AdsSection ya kera yayivuyemo) */}
        <section className="tv-ads-grid" style={{ gridTemplateColumns: "1fr", marginTop: "40px" }}>
          <TV videos={formattedVideos} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
