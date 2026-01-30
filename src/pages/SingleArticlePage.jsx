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

                // 2. Update views (Ibi nibyo bituma Popular News ikora)
                // Koresha "try-catch" yihariye hano kugira ngo view-error idahagarika page
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

    // --- HANO NIHO HAKOSOWE KUGIRA NGO AMAFOTO AGARAGARE ---
    const getMediaUrl = (url) => {
        if (!url) return "";
        // Niba ari Cloudinary (itangizwa na http/https), iyereke uko iri
        if (url.startsWith('http')) return url;
        
        // Niba ari local path (fallback), ongeraho base URL neza
        const base = API_BASE_URL_FETCH.endsWith('/') ? API_BASE_URL_FETCH.slice(0, -1) : API_BASE_URL_FETCH;
        return `${base}${url.startsWith('/') ? url : '/' + url}`;
    };

    const renderArticleBody = (bodyText) => {
        if (!bodyText) return null;
        // Split by newline and filter out empty strings
        const paragraphs = bodyText.split(/\n+/).filter(p => p.trim() !== "");
        return paragraphs.map((para, index) => (
            <div key={index} className="article-paragraph">{para.trim()}</div>
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

                    <div className="article-body-content">
                        {renderArticleBody(article.body)}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default SingleArticlePage;
