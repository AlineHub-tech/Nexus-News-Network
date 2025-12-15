import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";

export default function AdminDashboard() {
  const { pending, rawNews, approveNews, rejectNews, deleteNews, addAd, ads } = useContext(NewsContext);

  const [adForm, setAdForm] = useState({ title:'', description:'', isVideo:false, videoUrl:'' });
  const [adFile, setAdFile] = useState(null);

  const submitAd = async (e) => {
    e.preventDefault();
    const ok = await addAd(adForm, adFile);
    if (ok) alert("Ad added");
    else alert("Failed ad");
    setAdForm({ title:'', description:'', isVideo:false, videoUrl:''}); setAdFile(null);
  };

  return (
    <div>
      <h3>Pending</h3>
      {pending.map(p => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.category} • {p.author}</p>
          {p.type==='image' && p.image && <img src={`http://localhost/nexus_api/uploads/${p.image}`} alt="" style={{width:180}} />}
          {p.type==='video' && p.video_url && <iframe src={p.video_url} width="300" height="180" />}
          <button onClick={()=>approveNews(p.id)}>Approve</button>
          <button onClick={()=>rejectNews(p.id)}>Reject</button>
        </div>
      ))}

      <h3>Approved</h3>
      {rawNews.filter(n=>n.status==='approved').map(n=>(
        <div key={n.id}>
          <b>{n.title}</b>
          <button onClick={()=>deleteNews(n.id)}>Delete</button>
        </div>
      ))}

      <h3>Add Ad</h3>
      <form onSubmit={submitAd}>
        <input placeholder="Title" value={adForm.title} onChange={e=>setAdForm({...adForm,title:e.target.value})} />
        <textarea placeholder="Description" value={adForm.description} onChange={e=>setAdForm({...adForm,description:e.target.value})} />
        <label><input type="checkbox" checked={adForm.isVideo} onChange={e=>setAdForm({...adForm,isVideo:e.target.checked})} /> Video?</label>
        {adForm.isVideo ? <input placeholder="Video URL" value={adForm.videoUrl} onChange={e=>setAdForm({...adForm,videoUrl:e.target.value})} /> : <input type="file" onChange={e=>setAdFile(e.target.files[0])} />}
        <button type="submit">Upload Ad</button>
      </form>
    </div>
  );
}
