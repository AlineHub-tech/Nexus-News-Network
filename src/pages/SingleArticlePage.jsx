import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import '../styles/SingleArticlePage.css';

const API_BASE_URL_FETCH = import.meta.env.VITE_API_URL || '//localhost:5000';
const API_ARTICLE_FETCH = `${API_BASE_URL_FETCH}/api/public`;

const SingleArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // 1. Fata amakuru y'inkuru
                const res = await axios.get(`${API_ARTICLE_FETCH}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);

                // 2. Update views
                try {
                    await axios.put(`${API_ARTICLE_FETCH}/articles/${id}/view`);
                } catch (vErr) {
                    console.error("View update failed:", vErr);
                }
                
            } catch (err) {
                console.error("Error fetching article:", err);
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div className="loading-state">Loading...</div>;
    if (!article) return <div className="loading-state">Article not found.</div>;

    const getMediaUrl = (url) => {
        if (!url) return "";
        if (url.startsWith('http')) return url;
        const base = API_BASE_URL_FETCH.endsWith('/') ? API_BASE_URL_FETCH.slice(0, -1) : API_BASE_URL_FETCH;
        return `${base}${url.startsWith('/') ? url : '/' + url}`;
    };

    // --- HANO HAKOSOWE KUGIRA NGO BIHUZE NA DASHBOARD ---
    const renderArticleBody = (text) => {
        if (!text) return <p>No content available for this article.</p>;
        
        // Niba ari HTML iva muri editor (nka CKEditor), koresha dangerouslySetInnerHTML
        // Niba ari Plain Text isanzwe (nka textarea), koresha split nk'uko wari ubifite
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "");
        return paragraphs.map((para, index) => (
            <p key={index} className="article-paragraph" style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                {para.trim()}
            </p>
        ));
    };

    return (
        <div className="single-article-page">
            <Navbar />
            <main className="article-main">
                <article className="article-container">
                    <header className="article-header">
                        <span className="category-tag">{article.category}</span>
                        <h1 className="article-title">{article.title}</h1>
                        <div className="article-meta">
                            By <strong>{article.author}</strong> 
                            <span className="meta-divider">|</span>
                            {new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            <span className="meta-divider">|</span>
                            <span className="views-count">👁️ {article.views || 0} views</span>
                        </div>
                    </header>

                    <div className="article-media-wrapper">
                        {article.mediaUrl && article.mediaType === 'image' && (
                            <img src={getMediaUrl(article.mediaUrl)} alt={article.title} className="full-article-media" />
                        )}
                        {article.mediaUrl && article.mediaType === 'video' && (
                            <video src={getMediaUrl(article.mediaUrl)} controls className="full-article-media">
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    {/* HANO TWAKORESHEJE article.content kuko ari ryo Dashboard yawe yohereza */}
                    <div className="article-body-content">
                        {renderArticleBody(article.content || article.body)}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default SingleArticlePage;
