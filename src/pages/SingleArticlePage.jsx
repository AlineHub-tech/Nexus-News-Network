import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
                const res = await axios.get(`${API_ARTICLE_FETCH}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);

                // Update views
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

    const renderArticleBody = (text) => {
        if (!text) return <p>No content available.</p>;
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "");
        return paragraphs.map((para, index) => (
            <p key={index} className="article-paragraph" style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                {para.trim()}
            </p>
        ));
    };

    // SEO Data
    const articleTitle = `${article.title} | Nexus News Network`;
    const articleDesc = (article.content || article.body || "").substring(0, 160).replace(/[#*_]/g, '') + "...";
    const articleUrl = `https://nexus-news-network.vercel.app{id}`;
    const articleImg = getMediaUrl(article.mediaUrl);

    return (
        <HelmetProvider>
            <div className="single-article-page">
                {/* --- SEO METADATA --- */}
                <Helmet>
                    <title>{articleTitle}</title>
                    <meta name="description" content={articleDesc} />
                    <link rel="canonical" href={articleUrl} />
                    
                    {/* Facebook / Open Graph */}
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={article.title} />
                    <meta property="og:description" content={articleDesc} />
                    <meta property="og:image" content={articleImg} />
                    <meta property="og:url" content={articleUrl} />

                    {/* Twitter */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={article.title} />
                    <meta name="twitter:description" content={articleDesc} />
                    <meta name="twitter:image" content={articleImg} />
                </Helmet>

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
                                <img src={articleImg} alt={article.title} className="full-article-media" />
                            )}
                            {article.mediaUrl && article.mediaType === 'video' && (
                                <video src={articleImg} controls className="full-article-media">
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        <div className="article-body-content">
                            {renderArticleBody(article.content || article.body)}
                        </div>
                    </article>
                </main>
                
                <Footer />
            </div>
        </HelmetProvider>
    );
};

export default SingleArticlePage;
