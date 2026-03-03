import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import "../styles.css";

export default function TrendingTicker() {
  const { latestNews } = useContext(NewsContext);

  // Gushaka amakuru cyangwa fallback text
  const items = (latestNews && latestNews.length > 0) 
    ? latestNews.map(n => n.title) 
    : ["NEXUS NEWS NETWORK — STAY UPDATED"];
    
  const text = items.join("  •  ");

  return (
    <div className="trending">
      <span>{text}</span>
    </div>
  );
}
