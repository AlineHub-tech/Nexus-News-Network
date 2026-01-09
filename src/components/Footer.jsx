import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import "../styles/footer.css";

const Footer = () => {
  const { language } = useContext(NewsContext) || { language: "en" };

  const translations = {
    allRightsReserved: {
      en: "All rights reserved.",
      rw: "Uburenganzira bwose burabitswe.",
      fr: "Tous droits réservés.",
    },
    contactUs: {
      en: "Contact Us",
      rw: "Twandikire",
      fr: "Nous Contacter",
    },
    quickLinks: {
      en: "Quick Links",
      rw: "Imiyoboro Yihuse",
      fr: "Liens Rapides",
    },
    aboutUs: {
      en: "About Us",
      rw: "Ibirebana Natwe",
      fr: "À Propos de Nous",
    },
    ourMission: {
      en: "Our Mission",
      rw: "Intego Yacu",
      fr: "Notre Mission",
    },
    ourVision: {
      en: "Our Vision",
      rw: "Icyerekezo Cyacu",
      fr: "Notre Vision",
    },
    terms: {
      en: "Terms of Service",
      rw: "Amabwiriza ya Serivisi",
      fr: "Conditions d'Utilisation",
    },
    privacy: {
      en: "Privacy Policy",
      rw: "Politiki y'Ibanga",
      fr: "Politique de Confidentialité",
    },
  };

  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* INFO */}
        <div className="footer-info">
          <h2>Nexus News Network</h2>
          <p>© 2026 Nexus News Network. {t("allRightsReserved")}</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h3>{t("quickLinks")}</h3>
          <ul>
            <li><Link to="/about">{t("aboutUs")}</Link></li>
            <li><Link to="/mission">{t("ourMission")}</Link></li>
            <li><Link to="/vision">{t("ourVision")}</Link></li>
            <li><Link to="/terms">{t("terms")}</Link></li>
            <li><Link to="/privacy">{t("privacy")}</Link></li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div className="footer-socials">
          <h3>{t("contactUs")}</h3>

          <a href="https://www.facebook.com/profile.php?id=61566301534848" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>

          <a href="https://x.com/NEXUSNEWSNETWAK" target="_blank" rel="noreferrer">
            <i className="fab fa-x-twitter"></i>
          </a>

          <a href="https://www.instagram.com/nnnrwanda" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="https://www.tiktok.com/@nexus.news.network" target="_blank" rel="noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>

          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube"></i>
          </a>

          <a href="mailto:nexusnewsnetwork1@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
