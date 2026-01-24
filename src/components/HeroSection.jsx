// import React, { useContext } from "react";
// import { NewsContext } from "../context/NewsContext";
// import { Link } from "react-router-dom";
// import "../styles.css";
// export defaultc
//   const { latestNews, regularNews } = useContext(NewsContext);

//   // hero main = most recent latestNews[0]
//   const main = latestNews && latestNews.length>0 ? latestNews[0] : null;
//   // two small = next two from latest or from regular
//   const smalls = (latestNews && latestNews.slice(1,3)).length ? latestNews.slice(1,3) : (regularNews || []).slice(0,2);

//   return (
//     <section className="hero container">
//       <div className="hero-main news-card">
//         {main ? (
//           <>
//             <Link to={`/article/${main.id}`}>
//               <img src={main.image||"/placeholder.png"} alt={main.title} />
//               <div className="text">
//                 <h2>{main.title}</h2>
//                 <p className="meta">{main.category} • {main.author}</p>
//               </div>
//             </Link>
//           </>
//         ) : (
//           <div style={{padding:20}}>No featured article</div>
//         )}
//       </div>

//       <div className="hero-small">
//         {smalls.map(s => (
//           <div className="card news-card" key={s.id}>
//             <Link to={`/article/${s.id}`} style={{display:"flex", gap:10, alignItems:"center", textDecoration:"none", color:"inherit"}}>
//               <img src={s.image||"/placeholder.png"} alt={s.title} style={{width:140, height:90, objectFit:"cover"}} />
//               <div style={{padding:"8px 10px"}}>
//                 <h4 style={{fontSize:16, margin:0}}>{s.title}</h4>
//                 <p className="meta" style={{marginTop:6}}>{s.category} • {s.author}</p>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }