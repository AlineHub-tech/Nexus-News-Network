import React, { useContext } from "react";
import ukflag from "../assets/ukflag.jpeg";
import rwflag from "../assets/rwflag.jpeg";
import frflag from "../assets/frflag.jpeg";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { switchLanguage } = useContext(NewsContext);

  const flagStyle = {
    width: "16px",
    height: "12px",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "1px",
    marginLeft: "6px",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={ukflag}
        alt="EN"
        style={flagStyle}
        onClick={() => switchLanguage("en")}
      />

      <img
        src={rwflag}
        alt="RW"
        style={flagStyle}
        onClick={() => switchLanguage("rw")}
      />
      
      {/* Add the French flag switch */}
      <img
        src={frflag}
        alt="FR"
        style={flagStyle}
        onClick={() => switchLanguage("fr")}
      />
    </div>
  );
}
