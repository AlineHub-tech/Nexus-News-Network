import React, { useContext } from "react";
import ukflag from "../assets/ukflag.jpeg";
import rwflag from "../assets/rwflag.jpeg";
import "../styles/search.css";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { language, switchLanguage } = useContext(NewsContext);

  return (
    <div className="lang-switch">
      <img
        src={ukflag}
        alt="English"
        className={`lang-flag ${language === "en" ? "active" : ""}`}
        onClick={() => switchLanguage("en")}
      />

      <img
        src={rwflag}
        alt="Kinyarwanda"
        className={`lang-flag ${language === "rw" ? "active" : ""}`}
        onClick={() => switchLanguage("rw")}
      />
    </div>
  );
          }
