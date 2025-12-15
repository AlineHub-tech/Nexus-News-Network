import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
export default function SearchBar(){ const { searchQuery, setSearchQuery } = useContext(NewsContext); return <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search..." />; }
