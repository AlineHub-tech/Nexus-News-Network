// import React, { useContext } from "react";
// import { NewsContext } from "../context/NewsContext";
// import NewsCard from "./NewsCard";

// export default function VideoSection(){
//   const { news, incrementView, incrementLike } = useContext(NewsContext);
//   const videos = (news || []).filter(n => n.status==="approved" && n.isVideo);
//   if (videos.length===0) return null;

//   return (
//     <section className="video-section container">
//       <h2 className="section-title">Video / TV</h2>
//       <div className="regular-grid">
//         {videos.map(v => <NewsCard key={v.id} item={v} onView={incrementView} onLike={incrementLike} />)}
//       </div>
//     </section>
//   );
// }
import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCard from "./NewsCard";
import "../styles.css";
export default function VideoSection(){
  const { news, incrementView, incrementLike } = useContext(NewsContext);
  const videos = (news || []).filter(n=>n.status==="approved" && n.isVideo);

  if (!videos || videos.length===0) return null;

  return (
    <section className="video-section container">
      <h2 className="section-title">Nexus TV</h2>
      <div className="tv-grid">
        {videos.map(v => <div key={v.id}><NewsCard item={v} onView={incrementView} onLike={incrementLike} /></div>)}
      </div>
    </section>
  );
}
