import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";

export default function AuthorDashboard() {
  const { addNews } = useContext(NewsContext);
  const [form, setForm] = useState({ title:'', body:'', category:'', author:'', isVideo:false, videoUrl:''});
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const ok = await addNews(form, file);
    if (ok) { alert("Submitted"); setForm({ title:'', body:'', category:'', author:'', isVideo:false, videoUrl:''}); setFile(null); }
    else alert("Failed");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
      <textarea placeholder="Body" value={form.body} onChange={e=>setForm({...form,body:e.target.value})} />
      <input placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
      <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />

      <label><input type="checkbox" checked={form.isVideo} onChange={e=>setForm({...form,isVideo:e.target.checked})} /> Video?</label>
      {form.isVideo ? (
        <input placeholder="YouTube embed URL" value={form.videoUrl} onChange={e=>setForm({...form,videoUrl:e.target.value})} />
      ) : (
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}