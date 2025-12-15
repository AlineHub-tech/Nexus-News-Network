// import React, { useContext } from "react";
// import { NewsContext } from "../context/NewsContext";
// import NewsCard from "./NewsCard";

// export default function PopularNews(){
//   const { popularNews, incrementView, incrementLike } = useContext(NewsContext);
//   if(!popularNews || popularNews.length===0) return null;

//   return (
//     <section className="popular-section container">
//       <h2 className="section-title">Popular</h2>
//       <div className="regular-grid">
//         {popularNews.map(n => <NewsCard key={n.id} item={n} onView={incrementView} onLike={incrementLike} />)}
//       </div>
//     </section>
//   );
// }
// import React, { useContext, useRef, useEffect } from "react";
// import { NewsContext } from "../context/NewsContext";
// import  "../styles/Landing.css";
// const PopularNews = () => {
//   const { popularNews } = useContext(NewsContext);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     let scrollAmount = 0;
//     const maxScroll = slider.scrollWidth - slider.clientWidth;

//     const interval = setInterval(() => {
//       scrollAmount += 1;
//       if (scrollAmount >= maxScroll) scrollAmount = 0;
//       slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
//     }, 20);

//     return () => clearInterval(interval);
//   }, [popularNews]);

//   return (
//     <div className="popular-news">
//       <h3>Popular News</h3>
//       <div className="popular-wrapper" ref={sliderRef}>
//         {popularNews.map(item => (
//           <div key={item.id} className="popular-card">
//             <img src={item.image} alt={item.title}/>
//             <h4>{item.title}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularNews;
import React, { useContext, useRef, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCard from "./NewsCard";
import "../styles.css";
export default function PopularNews(){
  const { popularNews, incrementView, incrementLike } = useContext(NewsContext);
  const sc = useRef();

  useEffect(() => {
    // auto scroll horizontal
    const el = sc.current;
    if (!el) return;
    let pos = 0;
    const width = el.scrollWidth;
    const t = setInterval(() => {
      pos += 320;
      if (pos >= width) pos = 0;
      el.scrollTo({ left: pos, behavior: "smooth" });
    }, 3800);
    return ()=> clearInterval(t);
  }, [popularNews]);

  if (!popularNews || popularNews.length === 0) return null;

  return (
    <section className="popular-section container">
      <h2 className="section-title">Popular</h2>
      <div className="popular-row" ref={sc}>
        {popularNews.map(n => (
          <div key={n.id} style={{minWidth:300, marginRight:14}}>
            <NewsCard item={n} onView={incrementView} onLike={incrementLike} />
          </div>
        ))}
      </div>
    </section>
  );
}