import React, { useContext, useState, useEffect, useMemo } from "react";
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

// --- KOSORA HANO: Shyiraho http:// cyangwa https:// nyayo ---
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const Landing = () => {
  const { newsList, videosList, loading, error, searchQuery } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isOtherLoading, setIsOtherLoading] = useState(true);

  // --- IYI LOGIC NI INGENZI KURI CLOUDINARY ---
  // Ifasha gukosora URL z'amafoto mbere y'uko agera muri LatestNews/RegularNews
  const formatNewsWithImages = useCallback((list) => {
    return list.map(item => {
      let finalUrl = item.mediaUrl || "";
      // Niba URL itangiye na http (Cloudinary), ihite iyikoresha gutyo
      if (!finalUrl.startsWith('http') && finalUrl !== "") {
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
            // Kosora URL za Ads nazo hano
            const formattedAds = adsRes.data.map(ad => ({
                ...ad,
                mediaUrl: ad.mediaUrl?.startsWith('http') ? ad.mediaUrl : `${API_BASE_URL}${ad.mediaUrl}`
            }));
            setAds(formattedAds);
            setIsOtherLoading(false);
        } catch (err) {
            console.error("Error fetching ads data:", err.response?.data || err.message);
            setIsOtherLoading(false);
        }
    };
    fetchAdsData();
  }, []);

  // Koresha useMemo kugira ngo amakuru aze yakosowe URL
  const formattedNews = useMemo(() => formatNewsWithImages(newsList), [newsList, formatNewsWithImages]);
  const formattedVideos = useMemo(() => formatNewsWithImages(videosList), [videosList, formatNewsWithImages]);

  const latestNews8 = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);
  const regularNewsSliced = useMemo(() => formattedNews.slice(8), [formattedNews]);
  const popularNewsSliced = useMemo(() => formattedNews.slice(0, 8), [formattedNews]);

  if (loading || isOtherLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  if (newsList.length === 0 && searchQuery !== "") {
    return (
        <div className="landing-container">
            <Navbar/>
            <p className="no-results">Nta nkuru zibonetse kuri search: "{searchQuery}".</p>
            <Footer/>
        </div>
    );
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
