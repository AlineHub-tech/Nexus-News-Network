import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar  from '../components/Navbar'; 
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
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div className="loading-container">Loading...</div>;
    if (!article) return <div className="loading-container">Article not found.</div>;

    const getMediaUrl = (mediaUrl) => `${API_BASE_URL_FETCH}${mediaUrl}`;

    return (
        <div className="single-article-page">
            <Navbar/>
            <main className="article-main-content">
                <article className="article-wrapper">
                    <header className="article-header">
                        <span className="category-badge">{article.category}</span>
                        <h1>{article.title}</h1>
                        <div className="article-meta">
                            <span>By <strong>{article.author}</strong></span>
                            <span className="dot">•</span>
                            <span>{new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </header>

                    <div className="article-media-container">
                        {article.mediaUrl && article.mediaType === 'image' && (
                            <img src={getMediaUrl(article.mediaUrl)} alt="" className="main-media" />
                        )}
                        {article.mediaUrl && article.mediaType === 'video' && (
                            <video src={getMediaUrl(article.mediaUrl)} controls className="main-media" />
                        )}
                    </div>

                    {/* HANO NIHO HAKOSOWE SPACE: Nakoresheje div ifite class yihariye */}
                    <div className="article-body-text">
                        {article.body}
                    </div>
                </article>
            </main>
            <Footer/>
        </div>
    );
};

export default SingleArticlePage;
