import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

export default function CategoryPage(){
  const { name } = useParams();
  const { news } = useContext(NewsContext);
  const [list, setList] = useState([]);

  useEffect(()=> {
    const filtered = (news || []).filter(n => n.category === name.toLowerCase() && n.status === "approved");
    setList(filtered);
  }, [name, news]);

  return (
    <div className="container page">
      <h1 className="page-title">{name.toUpperCase()}</h1>
      {list.length === 0 ? <p>No articles found.</p> :
      <div className="grid cards">
        {list.map(a => (
          <Link to={`/article/${a.id}`} key={a.id} className="card">
            <img src={a.image} alt={a.title} onError={(e)=>e.target.src="/placeholder.png"} />
            <div className="card-body">
              <h3>{a.title}</h3>
              <p className="meta">✍ {a.author}</p>
            </div>
          </Link>
        ))}
      </div>
      }
    </div>
  );
}

