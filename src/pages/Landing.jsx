
import React from "react";
import Navbar from "../components/Navbar";
import TrendingTicker from "../components/TrendingTicker";
import SloganAnimation from "../components/SloganAnimation";
// import HeroSection from "../components/HeroSection";
import LatestNews from "../components/LatestNews";
import RegularNews from "../components/RegularNews";
import PopularNews from "../components/PopularNews";
import VideoSection from "../components/VideoSection";
import AdsSection from "../components/AdsSection";
import Footer from "../components/Footer";
import "../styles.css"; // import the styles (or merge into main styles)

export default function Landing(){
  return (
    <>
      <Navbar />
      <TrendingTicker />
      <SloganAnimation />
      <main>
        <div className="container">
          {/* <HeroSection /> */}
          <LatestNews />
          <RegularNews />
          <PopularNews />
          <VideoSection />
          <AdsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}


