import React from "react";
import "../styles/About.css";

const OurVision = () => {
  return (
    <section className="vision-section zoom-in">

      <h2 className="section-title">Our Vision</h2>

      <p className="section-text">
        We envision a future where Nexus News Network becomes a trusted,
        influential, and transformative media institution shaping informed,
        united, and progressive societies in Rwanda, Africa, and beyond.
      </p>

      <div className="vision-grid">
        <div className="vision-card">
          🤝
          <h4>Unity & Inclusion</h4>
          <p>
            Foster unity by promoting inclusive narratives that respect
            diversity.
          </p>
        </div>

        <div className="vision-card">
          📚
          <h4>Informed Society</h4>
          <p>
            Enable citizens to make informed decisions through access to
            credible information.
          </p>
        </div>

        <div className="vision-card">
          🌍
          <h4>Regional Influence</h4>
          <p>
            Expand our presence across East Africa and the global media space.
          </p>
        </div>

        <div className="vision-card">
          🌱
          <h4>Sustainable Media</h4>
          <p>
            Build a financially and ethically sustainable media organization.
          </p>
        </div>
      </div>

    </section>
  );
};

export default OurVision;
