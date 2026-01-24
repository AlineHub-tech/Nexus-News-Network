import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import { Link } from "react-router-dom";
import nnn from "../assets/nnn.jpg";
import "../styles/ExplorerCard.css";
import "../styles/Navbar.css";

export default function Navbar() {
  // Define a comprehensive translation mapping
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
    Author: { en: "Author", rw: "Uwanditse", fr: "Auteur" },
    Admin: { en: "Admin", rw: "Umuyobozi", fr: "Admin" },
    LogoText: { en: "Nexus News Network", rw: "Nexus News Network", fr: "Nexus News Network" }, // Logo text typically stays the same
  };

  const categories = [
    "Politics",
    "Sport",
    "Community",
    "Life",
    "Culture",
    "Entertainment",
    "TV",
    "Opinion",
    "Business",
    "Education",
  ];

  const { language } = useContext(NewsContext);

  // Helper function to get the translated string
  const getTranslation = (key) => {
    // Default to English if the requested language isn't available for that key

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <header className="navbar">
      <div className="navvv">
        <div className="log">{getTranslation("LogoText")}</div>

        <nav className="nav-links">
          <Link to="/">{getTranslation("Home")}</Link>
          <Link to="/register">{getTranslation("Author")}</Link>
          <Link to="/register">{getTranslation("Admin")}</Link>
        </nav>

        <div className="nav-actions">
          <SearchBar />
          <LangSwitch />
        </div>
      </div>
      <nav className="explorer-navbar">
        <div className="logo">
          <img src={nnn} alt="Logo" />
        </div>
        <div className="categories">
          {categories.map((c) => (
            // >>>>> HANO TWAKOSOYE LINK KUGIRA NGO IJYE KURI /category/CategoryName <<<<<
            <Link key={c} to={`/category/${c}`} className="category-link">
              {getTranslation(c)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}