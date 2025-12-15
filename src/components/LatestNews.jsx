// import React, { useContext, useEffect, useState } from "react";
// import { NewsContext } from "../context/NewsContext";
// import NewsCard from "./NewsCard";

// export default function LatestNews(){
//   const { latestNews, incrementView, incrementLike } = useContext(NewsContext);
//   const [index, setIndex] = useState(0);

//   useEffect(()=> {
//     setIndex(0);
//   }, [latestNews]);

//   useEffect(()=> {
//     if (!latestNews || latestNews.length===0) return;
//     const t = setInterval(()=> setIndex(i => (i+1) % latestNews.length), 3500);
//     return ()=> clearInterval(t);
//   }, [latestNews]);

//   if(!latestNews || latestNews.length===0) return null;

//   return (
//     <section className="latest-section">
//       <h2>Latest</h2>
//       <div className="latest-carousel">
//         {latestNews.map((item, i)=>(
//           <div key={item.id} className={"carousel-item "+(i===index?"active":"")}>
//             <img src={(item.image && item.image.trim())?item.image:"/placeholder.png"} alt={item.title} />
//             <div className="carousel-caption">
//               <h3>{item.title}</h3>
//               <p style={{color:"rgba(255,255,255,0.9)"}}>{item.category} • {item.author}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { Link } from "react-router-dom";
import "../styles.css";
import "../styles/LatestNews.css";
export default function LatestNews(){
  const { latestNews } = useContext(NewsContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [latestNews]);

  useEffect(() => {
    if (!latestNews || latestNews.length === 0) return;
    const t = setInterval(()=> setIndex(i => (i+1) % latestNews.length), 3500);
    return ()=> clearInterval(t);
  }, [latestNews]);

  if (!latestNews || latestNews.length === 0) return null;

  const item = latestNews[index];

  return (
    <section className="latest-section container">
      <h2 className="section-title">Latest</h2>
      <div className="latest-carousel">
        <div className="carousel-item active">
          <Link to={`/article/${item.id}`} style={{display:"block", height:"100%"}}>
            <img src={item.image||"/placeholder.png"} alt={item.title} />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <p style={{color:"rgba(255,255,255,0.95)"}}>{item.category} • {item.author}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

