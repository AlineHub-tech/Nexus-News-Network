// src/pages/Landing.jsx

// KOSORA HANO: Twongeyemo 'useCallback' mu rutonde rwa React hooks
import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import "../styles/Landing.css";
import LatestNews from "../components/LatestNews";
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import TV from "../components/TV";
import AdsSection from "../components/AdsSection";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingTicker from '../components/TrendingTicker';
import SloganAnimation from '../components/SloganAnimation';
import { NewsContext } from '../context/NewsContext';

// --- API BASE URL: Emeza ko hari http:// cyangwa https:// ---
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const Landing = () => {
  const { newsList, videosList, loading, error, searchQuery } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isOtherLoading, setIsOtherLoading] = useState(true);

  // Logic yo gukosora URL z'amafoto (Cloudinary vs Local)
  const formatMediaList = useCallback((list) => {
    if (!list) return [];
    return list.map(item => {
      let finalUrl = item.mediaUrl || "";
      // Niba URL ari iyuzuye (Cloudinary), yikoreshe gutyo
      if (finalUrl && !finalUrl.startsWith('http')) {
          const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
          const path = finalUrl.startsWith('/') ? finalUrl : '/' + finalUrl;
          finalUrl = `${base}${path}`;
      }
      return { ...item, mediaUrl: finalUrl };
    });
  }, []);

  useEffect(() => {
    const fetchAdsData = async () => {
        try {
            const adsRes = await axios.get(`${API_BASE_URL}/api/public/ads`);
            // Kosora URL za Ads nazo
            const formattedAds = adsRes.data.map(ad => {
                let url = ad.mediaUrl || "";
                if (url && !url.startsWith('http')) {
                    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
                    url = `${base}${url.startsWith('/') ? url : '/' + url}`;
                }
                return { ...ad, mediaUrl: url };
            });
            setAds(formattedAds);
            setIsOtherLoading(false);
        } catch (err) {
            console.error("Error fetching ads:", err.message);
            setIsOtherLoading(false);
        }
    };
    fetchAdsData();
  }, []);

  // Gutunganya inkuru zose zifite URL zikora
  const formattedNews = useMemo(() => formatMediaList(newsList), [newsList, formatMediaList]);
  const formattedVideos = useMemo(() => formatMediaList(videosList), [videosList, formatMediaList]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  if (loading || isOtherLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="landing-container">
      <Navbar/>
      <TrendingTicker/>
      <SloganAnimation/>

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
        <AdsSection ads={ads} />
      </section>

      <Footer/>
    </div>
  );
};

export default Landing;
