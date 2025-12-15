import React from 'react';
import '../styles/landing.css';
import "../styles.css";
export default function Pagination({ page, total, setPage }){
  if(total <= 1) return null;
  const arr = Array.from({ length: total }, (_,i) => i+1);
  return (
    <div className="pagination">
      {arr.map(p => (
        <button key={p} className={p===page? 'page active':'page'} onClick={()=>setPage(p)}>{p}</button>
      ))}
    </div>
  );
}