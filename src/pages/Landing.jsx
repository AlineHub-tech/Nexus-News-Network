import React, { useContext, useState, useEffect, useMemo } from "react";
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

const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000';

const Landing = () => {
  const { newsList, videosList, loading, error } = useContext(NewsContext);
  const [ads, setAds] = useState([]);
  const [isAdsLoading, setIsAdsLoading] = useState(true);

  // Fetch Ads - Gusa tugumana amamatayo yo hejuru
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

  // Gutunganya inkuru (Gukoresha newsList imereye nk'uko iri muri Context)
  const latestNews8 = useMemo(() => newsList.slice(0, 8), [newsList]);
  const regularNewsSliced = useMemo(() => newsList.slice(8), [newsList]);
  const popularNewsSliced = useMemo(() => newsList.slice(0, 8), [newsList]);

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
      {/* HEADER SECTION - Ibi biguma hejuru icyarimwe bidapfuka inkuru */}
      <header className="main-sticky-header">
        <Navbar />
        <TopStickyAds ads={ads} />
        <TrendingTicker />
      </header>

      {/* MAIN CONTENT - Isunikwa hasi na Header Automatically */}
      <main className="main-content-layout">
        <section className="latest-news-section-container">
           {/* Slide ubu izagaragara neza kuko header itayipfuka */}
           <LatestNews news={latestNews8} />
        </section>

        <section className="regular-news-section">
          <RegularNews newsList={regularNewsSliced} />
        </section>

        <section className="popular-news-section">
          <PopularNews newsList={popularNewsSliced} />
        </section>

        <section className="tv-ads-grid">
          <TV videos={videosList} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
