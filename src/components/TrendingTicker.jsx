import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import "../styles.css";
export default function TrendingTicker(){
  const { latestNews } = useContext(NewsContext);

  // build a single string from latest titles (fallback)
  const items = (latestNews && latestNews.length>0) ? latestNews.map(n=>n.title) : ["NEXUS NEWS NETWORK — STAY UPDATE"];
  const text = items.join("  •  ");

  return (
    <div className="trending">
      <span>{text}</span>
    </div>
  );
}

