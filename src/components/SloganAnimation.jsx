import React, { useEffect, useState } from "react";
import "../styles/SloganAnimation.css";

const slogans = [
  "Trusted News That Matters",
  "Your Voice, Your News",
  "Stay Informed, Stay Ahead",
  "Where Facts Lead the Story",
  "Real Journalism, Real Impact",
  "Breaking News, Breaking Barriers",
  "Truth Delivered Daily",
  "Stories That Shape Rwanda",
  "Insight Beyond Headlines",
  "Your Daily Source of Clarity"
];

const SloganAnimation = () => {
  const [index, setI] = useState(0);
 useEffect(() => {
    const t = setInterval(() => setI((s) => (s + 1) % slogans.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
     <section className="slogan">
            <h2 className="animated-slogan">
              {slogans.map((s, index) => (
                <span key={index}>{s}</span>
              ))}
            </h2>
            </section>
  );
};

export default SloganAnimation;

// import React, { useEffect, useState } from "react";
// import "../styles.css";
// const slogans = [
//   "Trusted News",
//   "Breaking Stories",
//   "Your Daily Update",
//   "Voice of Rwanda",
//   "Trending Now",
//   "Community Focus",
//   "Insightful Reports",
//   "Reliable Information",
//   "The Truth Matters",
//   "Stay Informed"
// ];

// export default function SloganAnimation(){
//   const [i, setI] = useState(0);
//   useEffect(()=> {
//     const t = setInterval(()=> setI(j => (j+1) % slogans.length), 2200);
//     return ()=> clearInterval(t);
//   }, []);
//   return (
//     <div className="slogan-wrap primary-bg" style={{padding:"22px 0", textAlign:"center"}}>
//       <h1 style={{margin:0, color:"#fff"}}>{slogans[i]}</h1>
//     </div>
//   );
// }