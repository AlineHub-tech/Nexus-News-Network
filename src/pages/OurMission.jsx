import React from "react";
import "../styles/About.css";

const OurMission = () => {
  return (
    <section className="mission-section slide-up">

      <h2 className="section-title">Our Mission</h2>

      <p className="section-text">
        Our mission is to deliver accurate, ethical, and inclusive media content
        that informs the public, strengthens community engagement, and empowers
        young people to actively participate in social, economic, and cultural
        development.
      </p>

      <div className="mission-list">
        <div className="mission-item">✅ Promote truthful and balanced journalism</div>
        <div className="mission-item">📢 Amplify community voices and untold stories</div>
        <div className="mission-item">🎓 Educate citizens through informative content</div>
        <div className="mission-item">🤝 Encourage civic responsibility and dialogue</div>
        <div className="mission-item">🚀 Empower youth through media and technology</div>
      </div>

      <div className="mission-icons">
        <span>📰</span>
        <span>📡</span>
        <span>🎤</span>
        <span>💡</span>
        <span>🌱</span>
      </div>

    </section>
  );
};

export default OurMission;
