import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import { Link } from "react-router-dom";
import nnn from "../assets/nnn.jpg";
import "../styles/ExplorerCard.css";
import "../styles/Navbar.css";

export default function Navbar() {
  // Define a mapping for English to Kinyarwanda translation for categories
  const categoryTranslations = {
    Politics: "Politiki",
    Sport: "Imikino",
    Community: "Umuryango",
    Life: "Ubuzima",
    Culture: "Umuco",
    Entertainment: "imyidagaduro",
    TV: "Televiziyo",
    Opinion: "Ibyiciro",
    Business: "Ubucuruzi",
    Education: "Uburezi",
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

  // Function to get the translated category name
  const getCategoryName = (categoryKey) => {
    if (language === "rw" && categoryTranslations[categoryKey]) {
      return categoryTranslations[categoryKey];
    }
    return categoryKey; // Default to English if language is "en" or translation not found
  };

  return (
    <header className="navbar">
      <div className="navvv">
        <div className="log">Nexus News Network</div>

        <nav className="nav-links">
          <Link to="/">{language === "en" ? "Home" : "Ahabanza"}</Link>
          <Link to="/author">
            {language === "en" ? "Author" : "Uwastitse"}
          </Link>
          <Link to="/admin">
            {language === "en" ? "Admin" : "Umuyobozi"}
          </Link>
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
            <Link key={c} to={`/category/${c}`} className="category-link">
              {getCategoryName(c)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
