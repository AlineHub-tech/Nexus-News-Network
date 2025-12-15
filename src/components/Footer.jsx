import React from "react";
import "../styles/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Info */}
        <div className="footer-info">
          <h2>Nexus New Network</h2>
          <p>© 2025 Nexus New Network. All rights reserved.</p>
          <p>Contact: info@nnnrwanda.rw</p>
        </div>

        {/* Social Media */}
        <div className="footer-socials">
         <a href="https://www.facebook.com/profile.php?id=61566301534848&mibextid=ZbWKwL" target="_blank">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://x.com/NEXUSNEWSNETWAK?t=PvqTyUXF3XBBmADoGwdg_w&s=09" target="_blank">
          <i className="fab fa-x"></i>
        </a>
        <a href="https://www.instagram.com/nnnrwanda?utm_source=ig_web_button_share_sheet&igsh=MXBoa2E1bXFnb3N2MA==" target="_blank">
          <i className="fab fa-instagram"></i>
        </a>
        {/* <a href="https://whatsapp.com/channel/0029VbAMorYCxoAzT2hmP53h" target="_blank">
          <i className="fab fa-message"></i>
        </a> */}
         <a href=" https://www.tiktok.com/@nexus.news.network?_t=ZM-8xy3htvIVbp&_r=1" target="_blank">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="youtube.com/@NexusNewsNetwork_11" target="_blank">
          <i className="fab fa-youtube"></i>
        </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
