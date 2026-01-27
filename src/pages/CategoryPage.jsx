import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import  Navbar  from '../components/Navbar'; // Yakosowe Navbar import
import Footer from '../components/Footer';
import RegularNews from '../components/RegularNews';
import '../styles/CategoryPage.css';

// --- UMURONGO W'INGENZI URI KUGENA API BASE URL ---
// Turakeka ko VITE_API_URL muri Vercel ari: https://nexus-news-network-backend.onrender.com (Nta slash/api ku iherezo)
const API_BASE_URL = import.meta.env.VITE_API_URL || '//localhost:5000'; // Hano wakuyemo '/api' ku iherezo
// ----------------------------------------


const CategoryPage = () => {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const capitalize = (s) => {
        if (typeof s !== 'string' || s.length === 0) {
            return '';
        }
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    useEffect(() => {
        const fetchCategoryArticles = async () => {
            if (!categoryName) {
                setError("No category selected. Check the URL."); // Ubutumwa bwahujwe
                setLoading(false);
                return;
            }

            try {
                // HANO NIHO GUHAMAGARA API BYAKOSOWE: Twongeyemo '/api/public/'
                // Adiresi yuzuye ikora neza ubu: https://
                const res = await axios.get(`${API_BASE_URL}/api/public/articles/category/${categoryName}`);
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching category articles:", err.response?.data?.msg || err.message);
                setError(`An error occurred while fetching news for '${categoryName}'. Ensure the backend is running.`); // Ubutumwa bwahujwe
                setLoading(false);
            }
        };

        fetchCategoryArticles();
    }, [categoryName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="category-page-container">
            {/* Navbar import yakosowe, irakora ubu */}
            <Navbar/>
            <h1>Category: {capitalize(categoryName)}</h1>

            {articles.length > 0 ? (
                <RegularNews newsList={articles} />
            ) : (
                <p>No articles found in {capitalize(categoryName)} currently.</p>
            )}
            <Footer/>
        </div>
    );
};

export default CategoryPage;
