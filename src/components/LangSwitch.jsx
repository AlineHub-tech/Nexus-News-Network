import React, { useContext } from "react";
import { ReactCountryFlag } from "@fadi-ui/react-country-flag";
import "../styles/search.css";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { language, switchLanguage } = useContext(NewsContext);

  return (
    <div className="lang-switch">
      <ReactCountryFlag
        countryCode="GB"
        svg
        style={{ width: "18px", height: "14px" }}
        className={`flag-icon ${language === "en" ? "active" : ""}`}
        onClick={() => switchLanguage("en")}
      />

      <ReactCountryFlag
        countryCode="RW"
        svg
        style={{ width: "18px", height: "14px" }}
        className={`flag-icon ${language === "rw" ? "active" : ""}`}
        onClick={() => switchLanguage("rw")}
      />
    </div>
  );
        }
