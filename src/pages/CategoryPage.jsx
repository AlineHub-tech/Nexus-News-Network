import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegularNews from '../components/RegularNews'; 
import '../styles/CategoryPage.css'; 

// --- UMURONGO W'INGENZI WAKOSOWE HANO ---
// Koresha Environment Variable VITE_API_URL iri muri Vercel Settings (https://url-ya-render.com)
// Niba uri local development, ukoresha http://localhost:5000/api gusa (HTTP)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// ----------------------------------------


const CategoryPage = () => {
    // Dukura categoryName muri URL (useParams)
    const { categoryName } = useParams(); 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function ikora capitalization y'inyuguti ya mbere (helper function)
    const capitalize = (s) => {
        if (typeof s !== 'string' || s.length === 0) {
            return '';
        }
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    useEffect(() => {
        const fetchCategoryArticles = async () => {
            if (!categoryName) {
                setError("Nta category yatoranyijwe. Reba URL.");
                setLoading(false);
                return; 
            }

            try {
                // Ihuza na URL twakosoye ikoresha categoryName
                const res = await axios.get(`${API_BASE_URL}/public/articles/category/${categoryName}`);
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching category articles:", err.response?.data?.msg || err.message);
                setError(`Habaye ikibazo mu gukurura inkuru za '${categoryName}'. Emeza ko backend ikora.`);
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
            <Navbar/>
            <h1>Category: {capitalize(categoryName)}</h1>
            
            {articles.length > 0 ? (
                <RegularNews newsList={articles} />
            ) : (
                <p>Nta nkuru zabonetse muri {capitalize(categoryName)} ubu.</p>
            )}
            <Footer/>
        </div>
    );
};

export default CategoryPage;
