// src/pages/SingleArticlePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SingleArticlePage.css'; // Ukeneye kurema iyi dosiye ya CSS

const API_BASE_URL = 'http://localhost:5000/api/public';
const BASE_SERVER_URL = 'http://localhost:5000';

const SingleArticlePage = () => {
    const { id } = useParams(); // Gufata ID mu URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);
            } catch (err) {
                setError("Habaye ikibazo mu gukurura inkuru cyangwa ntaboneka.");
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!article) return <div>Inkuru ntabonetse.</div>;

    return (
        <div className="single-article-container">
            <Navbar/>
            <div className="article-content-wrapper">
                <h1>{article.title}</h1>
                <p className="article-meta">
                    By <strong>{article.author}</strong> | {article.category} | {new Date(article.createdAt).toLocaleString()}
                </p>

                {/* Hano herekana Media (Ifoto/Video) */}
                {article.mediaUrl && article.mediaType === 'image' && (
                    <img src={`${BASE_SERVER_URL}${article.mediaUrl}`} alt={article.title} className="article-media" />
                )}
                {article.mediaUrl && article.mediaType === 'video' && (
                    <video src={`${BASE_SERVER_URL}${article.mediaUrl}`} controls className="article-media">
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* Hano herekana umubiri w'inkuru (body) */}
                <p className="article-body">{article.body}</p>
            </div>
            <Footer/>
        </div>
    );
};

export default SingleArticlePage;
