import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import "../styles/Landing.css";
import LatestNews from "../components/LatestNews";
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import TV from "../components/TV";
import TopStickyAds from "../components/TopStickyAds"; // Component nshya
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

  // Fetch Ads muri useEffect
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

  // Gutunganya inkuru zose zifite URL zikora (Memoized)
  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  // Loading Logic
  if (loading || isAdsLoading) {
    return <LoadingScreen />;
  }

  // Error Logic
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
      {/* 1. NAVBAR HEJURU BURUNDI */}
      <Navbar />

      {/* 2. TOP STICKY ADS (Iyi iguma hejuru u-scrolling-a) */}
      <TopStickyAds ads={ads} />

      {/* 3. TRENDING TICKER (Munsi ya Ads) */}
      <TrendingTicker />

      {/* 4. SPACER: Ibi bituma inkuru zidatwikirwa na Sticky Ads */}
      <div className="content-spacer" style={{ height: "10px" }}></div>

      <main className="main-content-layout">
        {/* 5. LATEST NEWS (4 hagati, 2 ku mpande nk'uko wayikoze) */}
        <section className="latest-news-section-container">
           <LatestNews news={latestNews8} />
        </section>

        <section className="regular-news-section">
          <RegularNews newsList={regularNewsSliced} />
        </section>

        <section className="popular-news-section">
          <PopularNews newsList={popularNewsSliced} />
        </section>

        {/* 6. TV SECTION (AdsSection ya kera hano nayikuyemo) */}
        <section className="tv-ads-grid" style={{ gridTemplateColumns: "1fr" }}>
          <TV videos={formattedVideos} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
