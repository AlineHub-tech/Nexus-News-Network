import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
export default function LangSwitch(){ const { language, switchLanguage } = useContext(NewsContext); return (<div><button onClick={()=>switchLanguage('en')}>EN</button><button onClick={()=>switchLanguage('rw')}>RW</button></div>); }
