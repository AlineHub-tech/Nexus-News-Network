import React, { useContext, useState, useEffect, useMemo } from "react";
import axios from 'axios';
import "../styles/Landing.css";
// Import components zose zikenerwa
import LatestNews from "../components/LatestNews";
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import TV from "../components/TV";
import AdsSection from "../components/AdsSection";
// HANO NIHO NAVIGBAR YAKOSOWE (Ubu ikoresha destructuring):
import  Navbar  from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingTicker from '../components/TrendingTicker';
import SloganAnimation from '../components/SloganAnimation';
import NewsCard from "../components/NewsCard";
// Import Context yo gucunga amakuru yose
import { NewsContext } from '../context/NewsContext';


// --- UMURONGO W'INGENZI URI KUGENA API BASE URL ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash/api/public ku iherezo)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';
// ----------------------------------------


const Landing = () => {
  const { newsList, videosList, loading, error, searchQuery } = useContext(NewsContext);

  const [ads, setAds] = useState([]);
  const [isOtherLoading, setIsOtherLoading] = useState(true);

  useEffect(() => {
    const fetchAdsData = async () => {
        try {
            // HANO NIHO GUHAMAGARA API BYAKOSOWE: Twongeyemo '/api/public/'
            // Adiresi yuzuye ikora neza ubu: https://
            const adsRes = await axios.get(`${API_BASE_URL}/api/public/ads`);
            setAds(adsRes.data);
            setIsOtherLoading(false);
        } catch (err) {
            console.error("Error fetching ads data:", err.response?.data || err.message);
            setIsOtherLoading(false);
        }
    };
    fetchAdsData();
  }, []);

  const latestNews8 = useMemo(() => newsList.slice(0, 8), [newsList]);
  const regularNewsSliced = useMemo(() => newsList.slice(8), [newsList]);
  const popularNewsSliced = useMemo(() => newsList.slice(0, 8), [newsList]);


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
            <p>Nta nkuru zibonetse kuri search: "{searchQuery}".</p>
            <Footer/>
        </div>
    );
  }

  return (
    <div className="landing-container">
      {/* SECTION 1: Header Components */}
      <Navbar/>
      <TrendingTicker/>
      <SloganAnimation/>

      {/* SECTION 2: Latest News (Inkuru 8 zose hamwe) */}
      <section className="latest-news-section-container">
         <LatestNews news={latestNews8} />
      </section>

      {/* SECTION 3: Regular News (Ikoresha pagination, izindi nkuru) */}
      <section className="regular-news-section">
        <RegularNews newsList={regularNewsSliced} />
      </section>

      {/* SECTION 4: Popular News (Ticker Style) */}
      <section className="popular-news-section">
        <PopularNews newsList={popularNewsSliced} />
      </section>

      {/* SECTION 5: TV & Ads */}
      <section className="tv-ads-grid">
        <TV videos={videosList} />
        <AdsSection ads={ads} />
      </section>

      {/* SECTION 6: Footer */}
      <Footer/>
    </div>
  );
};

export default Landing;
