import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar  from '../components/Navbar'; // Hano harakosowe (nongeyemo {})
import Footer from '../components/Footer';
import '../styles/SingleArticlePage.css';

// --- UMURONGO W'INGENZI URI KUGENA API BASE URL ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash ku iherezo)
// Hano twakuyemo 'http:' muri fallback URL kugira ngo Mixed Content Error idakomeza kubaho
const API_BASE_URL_FETCH = import.meta.env.VITE_API_URL || '//localhost:5000';
// ----------------------------------------

// URL yo guhamagara inkuru: https://
const API_ARTICLE_FETCH = `${API_BASE_URL_FETCH}/api/public`;


const SingleArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Guhamagara bikosoye neza ubu:
                const res = await axios.get(`${API_ARTICLE_FETCH}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching single article:", err.response?.data?.msg || err.message);
                setError("An error occurred while fetching the article details."); // Ubutumwa bwahujwe mu Cyongereza
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!article) return <div>Article not found.</div>;

    // Function yohereza URL ya Media kuri HTTPS byikora
    const getMediaUrl = (mediaUrl) => {
        return `${API_BASE_URL_FETCH}${mediaUrl}`;
    };

    return (
        <div className="single-article-container">
            <Navbar/>
            <div className="article-content-wrapper">
                <h4>{article.title}</h4>
                <p className="article-meta">
                    By <strong>{article.author}</strong> | {article.category} | {new Date(article.createdAt).toLocaleString()}
                </p>

                {/* Hano herekana Media (Ifoto/Video), URL yakosowe */}
                {article.mediaUrl && article.mediaType === 'image' && (
                    <img src={getMediaUrl(article.mediaUrl)} alt={article.title} className="article-media" />
                )}
                {article.mediaUrl && article.mediaType === 'video' && (
                    <video src={getMediaUrl(article.mediaUrl)} controls className="article-media">
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
