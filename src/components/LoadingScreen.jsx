import React from 'react';
import '../styles/LoadingScreen.css';
import nnn from "../assets/nnn.jpg";

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="logo-wrapper">
          <img src={nnn} alt="Nexus News Logo" className="loading-logo" />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <p className="loading-text">Loading Nexus News Network...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
