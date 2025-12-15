// import React, { useContext } from "react";
// import { NewsContext } from "../context/NewsContext";
// import NewsCard from "./NewsCard";

// export default function RegularNews(){
//   const { regularNews, incrementView, incrementLike } = useContext(NewsContext);
//   if (!regularNews || regularNews.length===0) return null;

//   return (
//     <section className="regular-section container">
//       <h2>Regular News</h2>
//       <div className="regular-grid">
//         {regularNews.map(n => <NewsCard key={n.id} item={n} onView={incrementView} onLike={incrementLike} />)}
//       </div>
//     </section>
//   );
// }
import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCard from "./NewsCard";
import "../styles.css";
export default function RegularNews({ customData=null, title="Regular News" }){
  const { regularNews, incrementView, incrementLike } = useContext(NewsContext);
  const data = customData || regularNews || [];

  if (!data || data.length === 0) return null;

  return (
    <section className="regular-section container">
      <h2 className="section-title">{title}</h2>
      <div className="regular-grid">
        {data.map(n => <NewsCard key={n.id} item={n} onView={incrementView} onLike={incrementLike} />)}
      </div>
    </section>
  );
}
