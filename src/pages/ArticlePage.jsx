import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

export default function ArticlePage(){
  const { id } = useParams();
  const { news, incrementView, incrementLike } = useContext(NewsContext);
  const [article, setArticle] = useState(null);

  useEffect(()=> {
    const found = (news || []).find(n => String(n.id) === String(id));
    if (found) {
      setArticle(found);
      incrementView(found.id);
    }
  }, [id, news]);

  if (!article) return <div className="container page">Article not found.</div>;

  return (
    <div className="container page">
      <article className="article">
        {article.isVideo && article.videoUrl ? (
          <div className="video-wrap">
            <iframe title={article.title} src={article.videoUrl} frameBorder="0" allowFullScreen />
          </div>
        ) : (
          <img src={article.image || "/placeholder.png"} alt={article.title} onError={(e)=>e.target.src="/placeholder.png"} className="article-img" />
        )}

        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">✍ {article.author} • {new Date(article.createdAt).toLocaleDateString()} • {article.views} views</div>

        <div className="article-body">{article.body}</div>

        <div className="article-actions">
          <button onClick={()=>incrementLike(article.id)} className="btn">❤ {article.likes||0}</button>
        </div>
      </article>
    </div>
  );
}
