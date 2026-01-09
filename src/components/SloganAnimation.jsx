import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import LangSwitch from "./LangSwitch";
import { Link } from "react-router-dom";// Import the context
import "../styles/SloganAnimation.css";

// Define all slogans with English (en), Kinyarwanda (rw), and French (fr) translations
const sloganTranslations = [
  {
    en: "Trusted News That Matters",
    rw: "Amakuru Yizewe Agaciro",
    fr: "Des Nouvelles Fiables Qui Comptent",
  },
  {
    en: "Your Voice, Your News",
    rw: "Ijwi ryawe, Amakuru yawe",
    fr: "Votre Voix, Vos Actualités",
  },
  {
    en: "Stay Informed, Stay Ahead",
    rw: "Menya Amakuru, Tera Imbere",
    fr: "Restez Informé, Gardez une Longueur d'Avance",
  },
  {
    en: "Where Facts Lead the Story",
    rw: "Aho Ukuri Kuyobora Inkuru",
    fr: "Là où les Faits Mènent l'Histoire",
  },
  {
    en: "Real Journalism, Real Impact",
    rw: "Itangazamakuru Nyakuri, Ingaruka Nyakuri",
    fr: "Vrai Journalisme, Impact Réel",
  },
  {
    en: "Breaking News, Breaking Barriers",
    rw: "Amakuru Mashya, Guca Imipaka",
    fr: "Nouvelles de Dernière Minute, Briser les Barrières",
  },
  {
    en: "Truth Delivered Daily",
    rw: "Ukuri Gutangwa Buri Munsi",
    fr: "La Vérité Livrée Quotidiennement",
  },
  {
    en: "Stories That Shape Rwanda",
    rw: "Inkuru Zihindura u Rwanda",
    fr: "Des Histoires Qui Façonnent le Rwanda",
  },
  {
    en: "Insight Beyond Headlines",
    rw: "Ubushishozi Burenga Ibyatanzwe",
    fr: "Un Aperçu Au-delà des Titres",
  },
  {
    en: "Your Daily Source of Clarity",
    rw: "Isoko yawe ya buri munsi yo Gusobanuka",
    fr: "Votre Source Quotidienne de Clarté",
  },
];

const SloganAnimation = () => {
  const [index, setIndex] = useState(0);
  const { language } = useContext(NewsContext); // Get the current language

  useEffect(() => {
    const t = setInterval(
      () => setIndex((s) => (s + 1) % sloganTranslations.length),
      2200
    );
    return () => clearInterval(t);
  }, []);

  // Get the current slogan based on the index and the active language

  const currentSlogan = sloganTranslations[index][language] || sloganTranslations[index].en;

  return (
    <section className="slogan">
      <h2 className="animated-slogan">
        {/* We only render one slogan at a time now */}
        <span>{currentSlogan}</span>
      </h2>
    </section>
  );
};

export default SloganAnimation;

