import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import LangSwitch from "./LangSwitch";
import { Link } from "react-router-dom";// Import the context
import "../styles/SloganAnimation.css";

// Define all slogans with English (en), Kinyarwanda (rw), and French (fr) translations
const sloganTranslations = [
  {
    key: "slogan1",
    en: "Trusted News That Matters",
    rw: "Amakuru Yizewe Agaciro",
    fr: "Des Nouvelles Fiables Qui Comptent",
  },
  {
    key: "slogan2",
    en: "Your Voice, Your News",
    rw: "Ijwi ryawe, Amakuru yawe",
    fr: "Votre Voix, Vos Actualités",
  },
  {
    key: "slogan3",
    en: "Stay Informed, Stay Ahead",
    rw: "Menya Amakuru, Tera Imbere",
    fr: "Restez Informé, Gardez une Longueur d'Avance",
  },
  {
    key: "slogan4",
    en: "Where Facts Lead the Story",
    rw: "Aho Ukuri Kuyobora Inkuru",
    fr: "Là où les Faits Mènent l'Histoire",
  },
  {
    key: "slogan5",
    en: "Real Journalism, Real Impact",
    rw: "Itangazamakuru Nyakuri, Ingaruka Nyakuri",
    fr: "Vrai Journalisme, Impact Réel",
  },
  {
    key: "slogan6",
    en: "Breaking News, Breaking Barriers",
    rw: "Amakuru Mashya, Guca Imipaka",
    fr: "Nouvelles de Dernière Minute, Briser les Barrières",
  },
  {
    key: "slogan7",
    en: "Truth Delivered Daily",
    rw: "Ukuri Gutangwa Buri Munsi",
    fr: "La Vérité Livrée Quotidiennement",
  },
  {
    key: "slogan8",
    en: "Stories That Shape Rwanda",
    rw: "Inkuru Zihindura u Rwanda",
    fr: "Des Histoires Qui Façonnent le Rwanda",
  },
  {
    key: "slogan9",
    en: "Insight Beyond Headlines",
    rw: "Ubushishozi Burenga Ibyatanzwe",
    fr: "Un Aperçu Au-delà des Titres",
  },
  {
    key: "slogan10",
    en: "Your Daily Source of Clarity",
    rw: "Isoko yawe ya buri munsi yo Gusobanuka",
    fr: "Votre Source Quotidienne de Clarté",
  },
];

const SloganAnimation = () => {
  const { language } = useContext(NewsContext);

  // Helper function to get the translated string
  const getTranslation = (sloganObj) => {

    return sloganObj[language] || sloganObj.en;
  };

  return (
    <section className="slogan">
      <h2 className="animated-slogan">
        {sloganTranslations.map((sloganObj) => (
          // By adding the 'language' to the key, React forces a full re-render of all spans 
          // every time the language changes, restarting the CSS animation sequence.
          <span key={sloganObj.key + language}>
            {getTranslation(sloganObj)}
          </span>
        ))}
      </h2>
    </section>
  );
};

export default SloganAnimation;
