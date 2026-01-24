import React, { useContext } from "react";
import "../styles/search.css"; 
import { NewsContext } from "../context/NewsContext";

export default function SearchBar(){ 
  const { searchQuery, setSearchQuery } = useContext(NewsContext); 

  // Function yo gusiba ibiri muri search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-container">
      <input 
        className="search-input" 
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
        placeholder="Search news, topics, etc..." 
        aria-label="Search news"
      />
      
      {/* Akabuto ko gusiba kagaragara gusa iyo hari ikirahanditsemo */}
      {searchQuery && (
        <button className="clear-search-button" onClick={clearSearch} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  ); 
}
