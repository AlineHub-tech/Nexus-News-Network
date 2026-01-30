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
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${API_ARTICLE_FETCH}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching single article:", err.response?.data?.msg || err.message);
                setError("An error occurred while fetching the article details.");
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div className="loading-state">Loading article...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!article) return <div className="error-state">Article not found.</div>;

    const getMediaUrl = (mediaUrl) => {
        return `${API_BASE_URL_FETCH}${mediaUrl}`;
    };

    return (
        <div className="single-article-container">
            <Navbar/>
            <div className="article-content-wrapper">
                <header className="article-header">
                    <h4>{article.title}</h4>
                    <div className="article-meta">
                        By <strong>{article.author}</strong> <span className="separator">|</span> {article.category} <span className="separator">|</span> {new Date(article.createdAt).toDateString()}
                    </div>
                </header>

                {article.mediaUrl && article.mediaType === 'image' && (
                    <img src={getMediaUrl(article.mediaUrl)} alt={article.title} className="article-media" />
                )}
                {article.mediaUrl && article.mediaType === 'video' && (
                    <video src={getMediaUrl(article.mediaUrl)} controls className="article-media">
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* HANO HAHINDUWE: Nakoresheje <div> aho kuba <p> kugira ngo space ivemo */}
                <div className="article-body">
                    {article.body}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SingleArticlePage;
