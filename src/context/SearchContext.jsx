import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en"); // en / rw

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, language, setLanguage }}
    >
      {children}
    </SearchContext.Provider>
  );
};
