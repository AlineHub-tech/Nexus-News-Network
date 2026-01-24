import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Mission.css"; 

const translations = {
  title: { en: "Our Mission", rw: "Intego Yacu", fr: "Notre Mission" },
  introText: {
    en: "Our mission is to deliver accurate, ethical, and inclusive media content that informs the public, strengthens community engagement, and empowers young people to actively participate in social, economic, and cultural development.",
    rw: "Intego yacu ni ugutanga amakuru yizewe, aboneye, kandi adasiga inyuma uwo ari we wese, agamije kumenyesha abaturage, gushimangira uruhare rw'abaturage, no guha urubyiruko imbaraga zo kugira uruhare rukomeye mu iterambere ry'imibereho, ubukungu, n'umuco.",
    fr: "Notre mission est de fournir un contenu médiatique précis, éthique et inclusif qui informe le public, renforce l'engagement communautaire et donne aux jeunes les moyens de participer activement au développement social, économique et culturel.",
  },
  

  item1: { en: "Promote truthful and balanced journalism", rw: " guteza imbere itangazamakuru ry'ukuri kandi ringana", fr: "Promouvoir un journalisme véridique et équilibré" },
  item2: { en: "Amplify community voices and untold stories", rw: "Gutanga ijwi ry'abaturage n'inkuru zitaravugwa", fr: "Amplifier les voix de la communauté et les histoires inédites" },
  item3: { en: "Educate citizens through informative content", rw: "Kw educatinga abaturage binyuze mu bikubiyemo by'amakuru", fr: "Éduquer les citoyens grâce à un contenu informatif" },
  item4: { en: "Encourage civic responsibility and dialogue", rw: "Gushishikariza inshingano za kirere n'ibiganiro", fr: "Encourager la responsabilité civique et le dialogue" },
  item5: { en: "Empower youth through media and technology", rw: "Guha urubyiruko imbaraga binyuze mu itangazamakuru n'ikoranabuhanga", fr: "Autonomiser les jeunes grâce aux médias et à la technologie" },
};

const OurMission = () => {
  const { language } = useContext(NewsContext);


  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <section className="mission-section">
      <Navbar/>
      <div className="mission-container">
        <h2 className="section-title">{t("title")}</h2>

        <p className="section-text">{t("introText")}</p>

        <div className="mission-list">
          <div className="mission-item">
            <i className="fas fa-check-circle icon-small"></i> {t("item1")}
          </div>
          <div className="mission-item">
            <i className="fas fa-microphone-alt icon-small"></i> {t("item2")}
          </div>
          <div className="mission-item">
            <i className="fas fa-graduation-cap icon-small"></i> {t("item3")}
          </div>
          <div className="mission-item">
            <i className="fas fa-comments icon-small"></i> {t("item4")}
          </div>
          <div className="mission-item">
            <i className="fas fa-rocket icon-small"></i> {t("item5")}
          </div>
        </div>

      </div>
        <Footer/>
    </section>
  
  );
};

export default OurMission;