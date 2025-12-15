import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
export default function NewsCard({ item, onView=()=>{}, onLike=()=>{} }){
  const src = (typeof item.image === "string" && item.image.trim()!=="") ? item.image : "/placeholder.png";
  return (
    <article className="news-card" onClick={()=>onView(item.id)}>
      <Link to={`/article/${item.id}`}>
        <img src={src} alt={item.title||"news"} onError={(e)=>e.target.src="/placeholder.png"} />
      </Link>

      <div className="news-content">
        <Link to={`/article/${item.id}`} style={{textDecoration:"none", color:"inherit"}}>
          <div className="news-title">{item.title}</div>
        </Link>

        <div className="news-author">✍ {item.author || "Unknown"}</div>
        <div className="news-snippet">{(item.body||"").slice(0,120)}{(item.body&&item.body.length>120)?"...":""}</div>

        <div className="news-meta">
          <span>👁 {item.views || 0}</span>
          <span onClick={(e)=>{ e.stopPropagation(); onLike(item.id); }} style={{cursor:"pointer"}}>❤ {item.likes || 0}</span>
        </div>
      </div>
    </article>
  );
}

