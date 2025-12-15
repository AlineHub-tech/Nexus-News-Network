import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export default function TV(){
  const { videoNews } = useContext(NewsContext);

  if (!videoNews || videoNews.length === 0) return null;

  return (
    <div className="container page">
      <h2>Nexus TV</h2>
      <div className="grid cards">
        {videoNews.map(v => (
          <div key={v.id} className="card">
            {v.videoUrl ? (
              <iframe title={v.title} src={v.videoUrl} frameBorder="0" allowFullScreen className="tv-iframe" />
            ) : (
              <video src={v.image} controls className="tv-video" />
            )}
            <div className="card-body">
              <h3>{v.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
