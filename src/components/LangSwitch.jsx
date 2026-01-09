import React, { useContext } from "react";
import ukflag from "../assets/ukflag.jpeg";
import rwflag from "../assets/rwflag.jpeg";
import { NewsContext } from "../context/NewsContext";

export default function LangSwitch() {
  const { switchLanguage } = useContext(NewsContext);

  const flagStyle = {
    width: "14px",
    height: "10px",
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
    </div>
  );
    }
