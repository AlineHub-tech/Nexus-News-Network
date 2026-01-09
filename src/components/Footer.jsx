// import React from "react";
// import "../styles/footer.css";
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Logo & Info */}
//         <div className="footer-info">
//           <h2>Nexus News Network</h2>
//           <p>© 2025 Nexus News Network. All rights reserved.</p>
//           <p>Email Us: nexusnewsnetwork1@gmail.com</p>
//         </div>

//         {/* Social Media */}
//         <div className="footer-socials">
//          <a href="https://www.facebook.com/profile.php?id=61566301534848&mibextid=ZbWKwL" target="_blank">
//           <i className="fab fa-facebook"></i>
//         </a>
//         <a href="https://x.com/NEXUSNEWSNETWAK?t=PvqTyUXF3XBBmADoGwdg_w&s=09" target="_blank">
//           <i className="fab fa-x"></i>
//         </a>
//         <a href="https://www.instagram.com/nnnrwanda?utm_source=ig_web_button_share_sheet&igsh=MXBoa2E1bXFnb3N2MA==" target="_blank">
//           <i className="fab fa-instagram"></i>
//         </a>
//         {/* <a href="https://whatsapp.com/channel/0029VbAMorYCxoAzT2hmP53h" target="_blank">
//           <i className="fab fa-message"></i>
//         </a> */}
//          <a href=" https://www.tiktok.com/@nexus.news.network?_t=ZM-8xy3htvIVbp&_r=1" target="_blank">
//           <i className="fab fa-tiktok"></i>
//         </a>
//         <a href="youtube.com/@NexusNewsNetwork_11" target="_blank">
//           <i className="fab fa-youtube"></i>
//         </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewsContext"; // Import the context
import "../styles/footer.css";

const Footer = () => {
  const { language } = useContext(NewsContext);

  // Define translations for footer text
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
      rw: "Imikoreshereze Yihuse",
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
      rw: "Amabwiriza Agenga Serivisi",
      fr: "Conditions d'Utilisation",
    },
    privacy: {
      en: "Privacy Policy",
      rw: "Politiki Y'ibanga",
      fr: "Politique de Confidentialité",
    },
  };

  // Helper function to get the translated string
  const getTranslation = (key) => {

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Info */}
        <div className="footer-info">
          <h2>Nexus News Network</h2>
          <p>
            © 2026 Nexus News Network. {getTranslation("allRightsReserved")}
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>{getTranslation("quickLinks")}</h3>
          <ul>
            <li>
              <Link to="/about">{getTranslation("aboutUs")}</Link>
            </li>
            <li>
              <Link to="/mission">{getTranslation("ourMission")}</Link>
            </li>
            <li>
              <Link to="/vision">{getTranslation("ourVision")}</Link>
            </li>
            <li>
              <Link to="/terms">{getTranslation("terms")}</Link>
            </li>
            <li>
              <Link to="/privacy">{getTranslation("privacy")}</Link>
            </li>
          </ul>
        </div>

        {/* Social Media (Kept as is) */}
        <div className="footer-socials">
          <h3>{getTranslation("contactUs")}</h3> {/* Use Contact Us title here */}
          <a
            href="https://www.facebook.com/profile.php?id=61566301534848&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://x.com/NEXUSNEWSNETWAK?t=PvqTyUXF3XBBmADoGwdg_w&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-x-twitter"></i> {/* Changed to fa-x-twitter for clarity */}
          </a>
          <a
            href="https://www.instagram.com/nnnrwanda?utm_source=ig_web_button_share_sheet&igsh=MXBoa2E1bXFnb3N2MA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href=" https://www.tiktok.com/@nexus.news.network?_t=ZM-8xy3htvIVbp&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
            <p>
           nexusnewsnetwork1@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// export default Footer;







