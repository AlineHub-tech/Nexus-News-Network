import React, { useContext, useState, useEffect, useMemo } from "react";
import axios from 'axios'; 
import "../styles/Landing.css"; // Styles rusange za Layout
// Import components zose zikenerwa
import LatestNews from "../components/LatestNews"; // Component yihariye ya LatestNews
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import TV from "../components/TV";
import AdsSection from "../components/AdsSection";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingTicker from '../components/TrendingTicker';
import SloganAnimation from '../components/SloganAnimation';
import NewsCard from "../components/NewsCard"; 
// Import Context yo gucunga amakuru yose
import { NewsContext } from '../context/NewsContext';


const API_BASE_URL = 'http://localhost:5000/api/public'; 

const Landing = () => {
  // newsList ubu irimo inkuru za page imwe gusa kubera pagination muri Context
  const { newsList, videosList, loading, error, searchQuery } = useContext(NewsContext);
  
  const [ads, setAds] = useState([]); 
  const [isOtherLoading, setIsOtherLoading] = useState(true); 

  useEffect(() => {
    const fetchAdsData = async () => { 
        try {
            const adsRes = await axios.get(`${API_BASE_URL}/ads`);
            setAds(adsRes.data);
            setIsOtherLoading(false);
        } catch (err) {
            console.error("Error fetching ads data:", err);
            setIsOtherLoading(false);
        }
    };
    fetchAdsData(); 
  }, []); 

  // Dukoresha useMemo kugabanya urutonde rw'inkuru zavuye muri Context nta duplicates
  // latestNews8 ikoresha inkuru 8 za mbere gusa muri list yose yavuye muri API
  const latestNews8 = useMemo(() => newsList.slice(0, 8), [newsList]);
  
  // RegularNews itangira ku nkuru ya 9 (izisigaye kuri page ya mbere)
  // Kubera ko newsList yari ifite pages gusa, iyi logic irakenewe:
  const regularNewsSliced = useMemo(() => newsList.slice(8), [newsList]);
  
  // Inkuru 8 za Popular/Trending (zo muri ticker)
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
      {/* Container imwe itazigabanyamo Left/Center/Right muri Landing.jsx */}
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
