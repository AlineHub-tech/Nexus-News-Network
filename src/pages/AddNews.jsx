import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";

export default function AddNews(){
  const { addNews } = useContext(NewsContext);

  const [form, setForm] = useState({ title:"", body:"", category:"", author:"", isVideo:false, videoUrl:"" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.category || !form.author) {
      return alert("Fill title, body, category and author");
    }
    await addNews(form, form.isVideo ? null : file);
    alert("Submitted — waiting for admin approval");
    setForm({ title:"", body:"", category:"", author:"", isVideo:false, videoUrl:"" });
    setFile(null);
    setPreview("");
  };

  return (
    <div className="container page">
      <div className="form-card">
        <h2>Add News</h2>

        <form onSubmit={submit} className="form-grid">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <textarea placeholder="Body" value={form.body} onChange={e=>setForm({...form, body:e.target.value})} />
          <input placeholder="Category (e.g. politics)" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <input placeholder="Author Name" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} />

          <label className="checkbox">
            <input type="checkbox" checked={form.isVideo} onChange={e=>setForm({...form, isVideo:e.target.checked})} /> Is Video?
          </label>

          {form.isVideo ? (
            <input placeholder="YouTube embed URL (https://www.youtube.com/embed/...)" value={form.videoUrl} onChange={e=>setForm({...form, videoUrl:e.target.value})} />
          ) : (
            <>
              <label>Upload image</label>
              <input type="file" accept="image/*" onChange={handleFile} />
              {preview && <img src={preview} alt="preview" className="preview" />}
            </>
          )}

          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

