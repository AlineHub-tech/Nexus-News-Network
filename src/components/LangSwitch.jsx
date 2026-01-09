import React, { useContext } from "react";
import "../styles/search.css";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { language, switchLanguage } = useContext(NewsContext);

  return (
    <div className="lang-switch">
      <span
        className={`flag-emoji ${language === "en" ? "active" : ""}`}
        onClick={() => switchLanguage("en")}
      >
        🇬🇧
      </span>

      <span
        className={`flag-emoji ${language === "rw" ? "active" : ""}`}
        onClick={() => switchLanguage("rw")}
      >
        🇷🇼
      </span>
    </div>
  );
                                 }
