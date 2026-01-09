import React from "react";
import "./About.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container fade-in">

        <h1 className="main-title">About Nexus News Network</h1>

        <p className="about-text">
          <strong>Nexus News Network (NNN Rwanda)</strong> is a professional,
          independent, and community-centered media platform operating under
          <strong> Nexus Group Rwanda</strong>. We are committed to delivering
          reliable, timely, and impactful news that reflects the realities,
          aspirations, and voices of our people.
        </p>

        <p className="about-text">
          Our platform focuses primarily on publishing content in
          <strong> Kinyarwanda</strong>, ensuring accessibility to the wider
          population, while also producing content in English and French to
          engage regional and international audiences.
        </p>

        <p className="about-text">
          At Nexus News Network, we combine responsible journalism, digital
          innovation, and creative storytelling to inform, educate, and inspire
          communities. We believe that media plays a vital role in shaping
          informed societies, strengthening democracy, and promoting positive
          social transformation.
        </p>

        <div className="about-highlights">
          <div className="highlight-card">
            📰
            <h4>Credible Journalism</h4>
            <p>
              We prioritize accuracy, fact-checking, and ethical reporting in
              every story we publish.
            </p>
          </div>

          <div className="highlight-card">
            🎯
            <h4>Community Impact</h4>
            <p>
              Our stories amplify grassroots voices and highlight issues that
              matter to local communities.
            </p>
          </div>

          <div className="highlight-card">
            🚀
            <h4>Digital Innovation</h4>
            <p>
              We embrace modern media tools including video, data journalism,
              and interactive storytelling.
            </p>
          </div>

          <div className="highlight-card">
            🌍
            <h4>Regional & Global Reach</h4>
            <p>
              Our multilingual approach allows us to reach audiences beyond
              Rwanda.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
