import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import "../styles/cards.css";

export default function ViewArticle(){
  const { id } = useParams();
  const { store, incView } = useContext(NewsContext);
  const item = (store|| []).find(n => n.id === id);
  useEffect(()=>{ if(item) incView(item.id); }, [id]);

  if(!item) return <div style={{padding:30}}>Article not found</div>;

  return (
    <div style={{maxWidth:900,margin:'20px auto',padding:12}}>
      <h1>{item.title}</h1>
      <div style={{color:'#6b7280'}}>By {item.author} • {item.category} • {new Date(item.createdAt || Date.now()).toLocaleString()}</div>
      { item.video ? <video controls src={item.video} style={{width:'100%',marginTop:12}} /> : <img src={item.image} alt="" style={{width:'100%',marginTop:12,borderRadius:8}} /> }
      <div style={{marginTop:12, fontSize:16, lineHeight:1.6}}>{item.content}</div>
      <div style={{marginTop:12}}>❤ {item.likes || 0} • 👁 {item.views || 0}</div>
    </div>
  )
}
