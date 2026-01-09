import React, { useContext } from "react";
import ukflag from "../assets/ukflag.jpeg";
import rwflag from "../assets/rwflag.jpeg";
import "../styles/search.css";
import { NewsContext } from "../context/NewsContext";
export default function LangSwitch(){ const { language, switchLanguage } = useContext(NewsContext); return (<div><button onClick={()=>switchLanguage('en')}>EN</button><button onClick={()=>switchLanguage('rw')}>RW</button></div>); }

