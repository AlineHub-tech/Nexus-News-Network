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
                const res = await axios.get(`${API_ARTICLE_FETCH}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error:", err);
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div className="loading-state">Loading...</div>;
    if (!article) return <div className="loading-state">Article not found.</div>;

    const getMediaUrl = (mediaUrl) => {
        if (!mediaUrl) return "";
        return mediaUrl.startsWith('http') ? mediaUrl : `${API_BASE_URL_FETCH}${mediaUrl}`;
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
                        </div>
                    </header>

                    {/* IFOTO CYANGWA VIDEO - Hano hagaragajwe neza */}
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

                    {/* BODY - Space nini yavuyemo hano */}
                    <div className="article-body-content">
                        {article.body}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default SingleArticlePage;
