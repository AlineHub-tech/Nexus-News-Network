import React, { useContext } from "react";
import ukflag from "../assets/ukflag.jpeg";
import rwflag from "../assets/rwflag.jpeg";
import frflag from "../assets/frflag.jpeg";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { switchLanguage } = useContext(NewsContext);

  const flagStyle = {
    width: "20px", // Nayongereye gato ngo agaragare neza
    height: "14px",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "transform 0.2s", // Bituma rinyeganyega gato iyo ugezeho
  };

  return (
    /* Gukoresha gap: "10px" bituma amabendera yitarura neza */
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src={ukflag}
        alt="EN"
        style={flagStyle}
        onClick={() => switchLanguage("en")}
        title="English"
      />

      <img
        src={rwflag}
        alt="RW"
        style={flagStyle}
        onClick={() => switchLanguage("rw")}
        title="Ikinyarwanda"
      />
      
      <img
        src={frflag}
        alt="FR"
        style={flagStyle}
        onClick={() => switchLanguage("fr")}
        title="Français"
      />
    </div>
  );
}
