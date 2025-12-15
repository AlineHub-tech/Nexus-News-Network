import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export default function AdsSection(){
  const { ads } = useContext(NewsContext);
  if(!ads || ads.length===0) return null;
  return (
    <section className="ads-section container">
      <h2 className="section-title">Advertisements</h2>
      <div className="regular-grid">
        {ads.map(ad => (
          <div key={ad.id} className="ad-card card">
            <img src={ad.image || "/placeholder.png"} alt={ad.title} onError={(e)=>e.target.src="/placeholder.png"} />
            <div style={{padding:12}}><strong>{ad.title}</strong></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// import React, { useContext } from "react";
// import { NewsContext } from "../context/NewsContext";
// import "../styles.css";
// export default function AdsSection(){
//   const { ads } = useContext(NewsContext);
//   if (!ads || ads.length===0) return null;

//   // top banner = first ad, rest displayed as grid
//   const [first, ...rest] = ads;

//   return (
//     <>
//       <section className="ads-banner container">
//         {first && (
//           <div className="ad-banner">
//             <img src={first.image||"/placeholder.png"} alt={first.title} onError={(e)=>e.target.src="/placeholder.png"} style={{width:"100%",height:"120px",objectFit:"cover",borderRadius:8}} />
//           </div>
//         )}
//       </section>

//       <section className="ads-section container">
//         <h2 className="section-title">Advertisements</h2>
//         <div className="regular-grid">
//           {rest.map(ad => (
//             <div key={ad.id} className="ad-card news-card">
//               <img src={ad.image||"/placeholder.png"} alt={ad.title} onError={(e)=>e.target.src="/placeholder.png"} />
//               <div className="news-content" style={{padding:12}}>
//                 <strong>{ad.title}</strong>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
