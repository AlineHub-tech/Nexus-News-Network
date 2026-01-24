import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Vision.css"; 

const translations = {
  title: { en: "Our Vision", rw: "Icyerekezo Cyacu", fr: "Notre Vision" },
  introText: {
    en: "We envision a future where Nexus News Network becomes a trusted, influential, and transformative media institution shaping informed, united, and progressive societies in Rwanda, Africa, and beyond.",
    rw: "Dutekereza ejo hazaza aho Nexus News Network izaba ikigo cy'itangazamakuru cyizewe, gifite imbaraga, kandi gihindura imibereho, cyubaka sosiyete ifite amakuru, yunze ubumwe, kandi itera imbere mu Rwanda, Afurika, n'ahandi hose ku isi.",
    fr: "Nous envisageons un avenir où Nexus News Network deviendra une institution médiatique de confiance, influente et transformatrice, façonnant des sociétés informées, unies et progressistes au Rwanda, en Afrique et au-delà.",
  },
  

  item1Title: { en: "Unity & Inclusion", rw: "Ubumwe & Kudasiga Inyuma", fr: "Unité & Inclusion" },
  item1Text: { en: "Foster unity by promoting inclusive narratives that respect diversity.", rw: "Duteza imbere ubumwe binyuze mu inkuru zidafata uruhande kandi zubahiriza amoko atandukanye.", fr: "Favoriser l'unité en promouvant des récits inclusifs qui respectent la diversité." },
  
  item2Title: { en: "Informed Society", rw: "Sosiyete Ifite Amakuru", fr: "Société Informée" },
  item2Text: { en: "Enable citizens to make informed decisions through access to credible information.", rw: "Duha abaturage ubushobozi bwo gufata ibyemezo bifite ishingiro binyuze mu kubona amakuru yizewe.", fr: "Permettre aux citoyens de prendre des décisions éclairées grâce à l'accès à des informations crédibles." },
  
  item3Title: { en: "Regional Influence", rw: "Ingaruka mu Karere", fr: "Influence Régionale" },
  item3Text: { en: "Expand our presence across East Africa and the global media space.", rw: "Kwagura imikorere yacu muri Afurika y'Uburasirazuba no mu itangazamakuru ry'isi yose.", fr: "Étendre notre présence en Afrique de l'Est et dans l'espace médiatique mondial." },
  
  item4Title: { en: "Sustainable Media", rw: "Itangazamakuru Rirambye", fr: "Médias Durables" },
  item4Text: { en: "Build a financially and ethically sustainable media organization.", rw: "Kubaka ikigo cy'itangazamakuru kirambye mu bijyanye n'ubukungu n'umuco.", fr: "Construire une organisation médiatique financièrement et éthiquement durable." },
};

const OurVision = () => {
  const { language } = useContext(NewsContext);



  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <section className="vision-section">
      <Navbar/>
      <div className="vision-container">
        <h2 className="section-title">{t("title")}</h2>

        <p className="section-text">{t("introText")}</p>

        <div className="vision-grid">
        
          <div className="vision-card">
            <i className="fas fa-handshake icon-large"></i>
            <h4>{t("item1Title")}</h4>
            <p>{t("item1Text")}</p>
          </div>

        
          <div className="vision-card">
            <i className="fas fa-book-open icon-large"></i>
            <h4>{t("item2Title")}</h4>
            <p>{t("item2Text")}</p>
          </div>

        
          <div className="vision-card">
            <i className="fas fa-map-marked-alt icon-large"></i>
            <h4>{t("item3Title")}</h4>
            <p>{t("item3Text")}</p>
          </div>

                 <div className="vision-card">
            <i className="fas fa-seedling icon-large"></i>
            <h4>{t("item4Title")}</h4>
            <p>{t("item4Text")}</p>
          </div>
        </div>
        
      </div><Footer/>
    </section>
  );
};

export default OurVision;