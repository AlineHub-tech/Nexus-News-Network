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
