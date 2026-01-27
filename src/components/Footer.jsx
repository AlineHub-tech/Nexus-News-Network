import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import "../styles/footer.css";
// Injection ya Font Awesome CSS link muri index.html irakenewe kugira ngo icons zigaragare

const Footer = () => {
  const { language } = useContext(NewsContext) || { language: "en" };
  const [email, setEmail] = useState("");

  const translations = {
    allRightsReserved: { en: "All rights reserved.", rw: "Uburenganzira bwose burabitswe.", fr: "Tous droits réservés." },
    contactUs: { en: "Contact Us", rw: "Twandikire", fr: "Nous Contacter" },
    quickLinks: { en: "Quick Links", rw: "Imiyoboro Yihuse", fr: "Liens Rapides" },
    aboutUs: { en: "About Us", rw: "Ibirebana Natwe", fr: "À Propos de Nous" },
    ourMission: { en: "Our Mission", rw: "Intego Yacu", fr: "Notre Mission" },
    ourVision: { en: "Our Vision", rw: "Icyerekezo Cyacu", fr: "Notre Vision" },
    terms: { en: "Terms of Service", rw: "Amabwiriza ya Serivisi", fr: "Conditions d'Utilisation" },
    privacy: { en: "Privacy Policy", rw: "Politiki y'Ibanga", fr: "Politique de Confidentialité" },
    stayUpdated: { en: "Stay Updated", rw: "Umenya Amakuru Mashya", fr: "Restez Informé" },
    subscribePrompt: { en: "Subscribe to our newsletter to get the latest news and updates delivered straight to your inbox.", rw: "Iyandikishe kuri newsletter yacu kugira ngo ubashe kubona amakuru n'ibishya byose byihuse.", fr: "Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles directement dans votre boîte de réception." },
    subscribeButton: { en: "Subscribe", rw: "Iyandikishe", fr: "S'abonner" },
    siteDescription: { en: "Nexus News Network provides timely and reliable news coverage across Rwanda and beyond. Your source for credible information.", rw: "Nexus News Network itangaza amakuru yizewe kandi ku gihe, arebana n'u Rwanda n'isi yose.", fr: "Nexus News Network fournit une couverture médiatique fiable et opportune au Rwanda et au-delà." },
  };

  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="footer-container-wrapper">
      <div className="footer-content-area">

        {/* SECTION 1: INFO & DESCRIPTION */}
        <div className="footer-section footer-info">
          <h2>Nexus News Network</h2>
          <p>{t("siteDescription")}</p>
        </div>

        {/* SECTION 2: QUICK LINKS */}
        <div className="footer-section footer-links">
          <h3>{t("quickLinks")}</h3>
          <ul>
            <li><Link to="/about">{t("aboutUs")}</Link></li>
            <li><Link to="/mission">{t("ourMission")}</Link></li>
            <li><Link to="/vision">{t("ourVision")}</Link></li>
            <li><Link to="/terms">{t("terms")}</Link></li>
            <li><Link to="/privacy">{t("privacy")}</Link></li>
          </ul>
        </div>

        {/* SECTION 3: STAY UPDATED / SUBSCRIBE */}
        <div className="footer-section footer-subscribe">
          <h3>{t("stayUpdated")}</h3>
          <p>{t("subscribePrompt")}</p>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">{t("subscribeButton")}</button>
          </form>
        </div>

        {/* SECTION 4: SOCIALS / CONTACT US */}
        <div className="footer-section footer-socials">
          <h3>{t("contactUs")}</h3>
          <div className="social-icons">
            {/* Koresha icons zose neza */}
            <a href="https://www.facebook.com/profile.php?id=61566301534848&mibextid=ZbWKwL" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/NEXUSNEWSNETWAK?t=PvqTyUXF3XBBmADoGwdg_w&s=09" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
            <a href=" https://www.instagram.com/nnnrwanda?utm_source=ig_web_button_share_sheet&igsh=MXBoa2E1bXFnb3N2MA==" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href=" https://www.tiktok.com/@nexus.news.network?_t=ZM-8xy3htvIVbp&_r=1" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            <a href="youtube.com/@NexusNewsNetwork_11" target="_blank" rel="noreferrer" aria-label="Youtube"><i className="fab fa-youtube"></i></a>
            <a href="mailto:nexusnewsnetwork1@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR - Stays full width */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Nexus News Network. {t("allRightsReserved")} | Developed by <a href="https://aline-site-seven.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="developer-name">Umugwaneza Aline</span>
            </a>
        </p>
      </div>

      {/* Kwibutsa kongeramo Font Awesome mu index.html */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}

    </footer>
  );
};

export default Footer;
