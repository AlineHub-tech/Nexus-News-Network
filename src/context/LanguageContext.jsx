import React, { createContext, useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorageUtils";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = loadData("lang");
    if (storedLang) setLang(storedLang);
  }, []);

  useEffect(() => {
    saveData("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "rw" : "en"));
  };

  const text = {
    en: {
      politics: "Politics",
      sports: "Sports",
      community: "Community",
      life: "Life",
      culture: "Culture",
      entertainment: "Entertainment",
      tv: "TV",
      opinion: "Opinion",
      business: "Business",
      education: "Education",
      search: "Search news...",
    },
    rw: {
      politics: "Politiki",
      sports: "Imikino",
      community: "Umuryango",
      life: "Ubuzima",
      culture: "Umuco",
      entertainment: "Imyidagaduro",
      tv: "TV",
      opinion: "Ibitekerezo",
      business: "Ubucuruzi",
      education: "Uburezi",
      search: "Shakisha inkuru...",
    },
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, text }}>
      {children}
    </LanguageContext.Provider>
  );
};

