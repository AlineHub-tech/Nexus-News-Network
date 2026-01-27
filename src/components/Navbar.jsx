import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import nnn from "../assets/nnn.jpg";
import "../styles/Navbar.css"; 
import SearchBar from "./SearchBar"; 
import LangSwitch from "./LangSwitch";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useContext(NewsContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const translations = {
    Politics: { en: "Politics", rw: "Politiki", fr: "Politique" },
    Sport: { en: "Sport", rw: "Imikino", fr: "Sport" },
    Community: { en: "Community", rw: "Umuryango", fr: "Communauté" },
    Life: { en: "Life", rw: "Ubuzima", fr: "Vie" },
    Culture: { en: "Culture", rw: "Umuco", fr: "Culture" },
    Entertainment: { en: "Entertainment", rw: "imyidagaduro", fr: "Divertissement" },
    TV: { en: "TV", rw: "Televiziyo", fr: "Télévision" },
    Opinion: { en: "Opinion", rw: "Ibyiciro", fr: "Opinion" },
    Business: { en: "Business", rw: "Ubucuruzi", fr: "Affaires" },
    Education: { en: "Education", rw: "Uburezi", fr: "Éducation" },
    Home: { en: "Home", rw: "Ahabanza", fr: "Accueil" },
    Login: { en: "Login", rw: "Injira", fr: "Connexion" },
    Logout: { en: "Logout", rw: "Sohoka", fr: "Déconnexion" },
    Dashboard: { en: "Dashboard", rw: "Dashboard", fr: "Tableau de bord" },
  };

  const categories = [
    "Politics", "Sport", "Community", "Life", "Culture",
    "Entertainment", "TV", "Opinion", "Business", "Education",
  ];

  const getTranslation = (key) => {
    // Kosora uburyo translation iboneka neza kurusha ubugorozi bwabanje:
    if (translations[key] && translations[key][language]) {
        return translations[key][language];
    }
    return key; // Garura key niba translation itarabonetse
  };

  const handleAuthAction = () => {
    setIsMenuOpen(false);
    if (user) {
        logout();
        navigate("/");
    } else {
        navigate("/login");
    }
  };

  return (
    <header className="navbar-container sticky-top">
      <div className="navbar-top">
        <div className="logo-section">
            <Link to="/"> 
                <img src={nnn} alt="Logo" className="site-logo" />
            </Link>
            <div className="site-name">Nexus News Network</div>
        </div>

        <div className="nav-actions">
          <SearchBar />
          <LangSwitch />
          
          <button onClick={handleAuthAction} className="auth-icon-button" title={user ? getTranslation("Logout") : getTranslation("Login")}>
             👤
          </button>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             ☰ 
          </button>
        </div>
      </div>

      <nav className={`nav-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="menu-link">{getTranslation("Home")}</Link>
        
        {user && (
            <Link to={user.role === 'admin' ? "/admin-dashboard" : "/author-dashboard"} onClick={() => setIsMenuOpen(false)} className="menu-link">
                {getTranslation("Dashboard")}
            </Link>
        )}

        <div className="mobile-categories-title">Categories</div>
        {categories.map((c) => (
             <Link key={c} to={`/category/${c}`} onClick={() => setIsMenuOpen(false)} className="menu-link">
                {getTranslation(c)}
             </Link>
        ))}
      </nav>

      <nav className="explorer-navbar">
        <div className="categories-wrapper-desktop">
          <Link to="/" className="category-link home-link">{getTranslation("Home")}</Link>

          {categories.map((c) => (
            <Link key={c} to={`/category/${c}`} className="category-link">
              {getTranslation(c)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
