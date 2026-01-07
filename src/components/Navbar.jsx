import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import { Link } from "react-router-dom";
import nnn from "../assets/nnn.jpg";
import "../styles/ExplorerCard.css";
import "../styles/Navbar.css";
export default function Navbar(){
   const categories = [
    "Politics","Sport","Community","Life","Culture",
    "Entertainment","TV","Opinion","Business","Education"
  ];
  const { language } = useContext(NewsContext);
    return (
    <header className="navbar">
      <div className="navvv">
      <div className="log">Nexus News Network</div>

      <nav className="nav-links">
        <Link to="/">{language==="en" ? "Home" : "Ahabanza"}</Link>
        <Link to="/author">{language==="en" ? "Author" : "Uwastitse"}</Link>
        <Link to="/admin">{language==="en" ? "Admin" : "Umuyobozi"}</Link>
      </nav>

      <div className="nav-actions">
        <SearchBar />
        <LangSwitch />
      </div>
      </div>
       <nav className="explorer-navbar">
      <div className="logo">
        <img src={nnn} alt="Logo" />
      </div>
      <div className="categories">
        {categories.map(c => (
          <Link key={c} to={`/category/${c}`} className="category-link">
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
     </header>
    
  );
}

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { NewsContext } from "../context/NewsContext";
// import "../styles.css";

// export default function Navbar(){
//   const { language, setSearchQuery } = useContext(NewsContext);
//   const categories = ["politics","sport","community","life","culture","entertainment","tv","opinion","business","education"];

//   return (
//     <header className="site-navbar">
//       <div className="topbar container">
//         <div className="brand">
//           <Link to="/" className="logo">Nexus News</Link>
//         </div>

//         <nav className="top-links">
//           <Link to="/author">{language==="en" ? "Author" : "Uwastitse"}</Link>
//           <Link to="/admin">{language==="en" ? "Admin" : "Umuyobozi"}</Link>
//         </nav>

//         <div className="top-actions">
//           <input
//             className="search-input"
//             placeholder={language==="en" ? "Search news..." : "Shakisha amakuru..."}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="lang-switch">
//             <button onClick={() => { localStorage.setItem("nnn_lang","en"); window.location.reload(); }} className="lang">EN</button>
//             <button onClick={() => { localStorage.setItem("nnn_lang","rw"); window.location.reload(); }} className="lang">RW</button>
//           </div>
//         </div>
//       </div>

//       <div className="catbar">
//         <div className="container catlist">
//           {categories.map(c => (
//             <Link to={`/category/${c}`} className="cat-link" key={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</Link>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// }


