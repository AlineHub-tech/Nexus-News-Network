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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://onrender.com';

const Landing = () => {
  const { newsList, videosList, loading, error, currentPage } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isAdsLoading, setIsAdsLoading] = useState(true);

  const formatMediaList = useCallback((list) => {
    if (!list) return [];
    return list.map(item => {
      let finalUrl = item.mediaUrl || "";
      if (finalUrl && !finalUrl.startsWith('http')) {
          const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
          finalUrl = `${base}${finalUrl.startsWith('/') ? finalUrl : '/' + finalUrl}`;
      }
      return { ...item, mediaUrl: finalUrl };
    });
  }, []);

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
        } catch (err) { console.error(err.message); } finally { setIsAdsLoading(false); }
    };
    fetchAdsData();
  }, []);

  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  // Inkuru 8 za mbere kuri Latest
  const latest8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  // Inkuru zose zihera ku ya 1 (Regular izaba ifite logic yo gukata bitewe na Page)
  const regularAll = formattedNews;
  // Inkuru 10 zikunzwe (Popular)
  const popular10 = useMemo(() => [...formattedNews].sort((a,b) => (b.views||0) - (a.views||0)).slice(0, 10), [formattedNews]);

  if (loading || isAdsLoading) return <LoadingScreen />;
  if (error) return <div className="error-page"><h2>{error}</h2><button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="landing-container">
      <header className="main-site-header">
        <TopStickyAds ads={ads} />
        <Navbar />
        <TrendingTicker />
      </header>

      <main className="main-content-layout">
        {/* LATEST NEWS: Igaragara gusa kuri Page 1 */}
        {currentPage === 1 && (
          <section className="latest-news-section-wrapper">
             <LatestNews news={latest8} />
          </section>
        )}

        {/* REGULAR NEWS: Hano heza inkuru zose, yo ikore slice */}
        <section className="regular-news-section">
          <RegularNews newsList={regularAll} />
        </section>

        <section className="popular-news-section-container">
          <PopularNews newsList={popular10} />
        </section>

        <section className="tv-section">
          <TV videos={formattedVideos} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
