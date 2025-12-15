import React, { useState, useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { uid } from "../utils/id";
import "../styles/global.css";
export default function NewsForm(){
  const { addPending } = useContext(NewsContext);
  const user = JSON.parse(sessionStorage.getItem('nx_user') || '{"email":"author@nx.rw","name":"Author"}');
  const [form, setForm] = useState({ title:'', category:'politic', content:'', image:'', video:'' });

  const toBase64 = file => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = err => rej(err);
    reader.readAsDataURL(file);
  });

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if(!f) return;
    const b = await toBase64(f);
    setForm(prev => ({...prev, image: b}));
  };
  const handleVideo = async (e) => {
    const f = e.target.files[0];
    if(!f) return;
    // small videos only; else store thumbnail instead
    const b = await toBase64(f);
    setForm(prev => ({...prev, video: b, isVideo: true}));
  };

  const submit = (e) => {
    e.preventDefault();
    const post = {
      id: uid('p_'),
      title: form.title,
      category: form.category,
      content: form.content,
      image: form.image || '/news-placeholder.jpg',
      video: form.video || '',
      author: user.name || user.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0,
      isVideo: !!form.video
    };
    addPending(post);
    alert('Submitted to admin for approval');
    setForm({ title:'', category:'politic', content:'', image:'', video:'' });
  };

  return (
    <form onSubmit={submit} style={{background:'#fff',padding:14,borderRadius:10,boxShadow:'0 6px 18px rgba(0,0,0,0.06)'}}>
      <h3>Create Article</h3>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/>
      <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
        <option value="politic">Politics</option>
        <option value="sport">Sport</option>
        <option value="community">Community</option>
        <option value="life">Life</option>
        <option value="culture">Culture</option>
        <option value="entertainment">Entertainment</option>
        <option value="tv">TV</option>
        <option value="opinion">Opinion</option>
        <option value="business">Business</option>
        <option value="education">Education</option>
      </select>
      <textarea placeholder="Content" value={form.content} onChange={e=>setForm({...form, content:e.target.value})} required/>
      <label>Upload Image (jpg, png)</label>
      <input type="file" accept="image/*" onChange={handleFile}/>
      <label>Upload Video (optional)</label>
      <input type="file" accept="video/*" onChange={handleVideo}/>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button type="submit" style={{background:'#0A58CA',color:'#fff',padding:'8px 12px',border:0,borderRadius:8}}>Submit to Admin</button>
      </div>
    </form>
  )
}

