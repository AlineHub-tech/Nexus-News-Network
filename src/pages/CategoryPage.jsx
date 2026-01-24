import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegularNews from '../components/RegularNews'; 
import '../styles/CategoryPage.css'; 

// URL ya API tuyishyize hejuru kugira ngo byorohere guhindura
const API_BASE_URL = 'http://localhost:5000/api/public';

const CategoryPage = () => {
    // Dukura categoryName muri URL (useParams)
    const { categoryName } = useParams(); 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function ikora capitalization y'inyuguti ya mbere (helper function)
    const capitalize = (s) => {
        // Tugenzura niba s (string) irimo ikintu kandi ari string koko
        if (typeof s !== 'string' || s.length === 0) {
            return ''; // Cyangwa ukagarura izina risanzwe "Category"
        }
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    useEffect(() => {
        const fetchCategoryArticles = async () => {
            // Igenzura ry'ibanze: Niba nta categoryName ibonetse muri URL, duhita duhagarara
            if (!categoryName) {
                setError("Nta category yatoranyijwe. Reba URL.");
                setLoading(false);
                return; 
            }

            try {
                // Ihuza na URL twakosoye ikoresha categoryName
                const res = await axios.get(`${API_BASE_URL}/articles/category/${categoryName}`);
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching category articles:", err.response?.data?.msg || err.message);
                // Twongereye ubutumwa burambuye kuri user
                setError(`Habaye ikibazo mu gukurura inkuru za '${categoryName}'. Emeza ko backend ikora.`);
                setLoading(false);
            }
        };

        fetchCategoryArticles();
    }, [categoryName]); // useEffect izongera gukora igihe categoryName ihindutse

    // Uko bigaragara igihe biri gutwara amakuru
    if (loading) {
        return <div>Loading...</div>;
    }

    // Uko bigaragara igihe habaye ikibazo
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="category-page-container">
            <Navbar/>
            {/* Dukoresheje function ya 'capitalize' twateguye kandi tuzi ko categoryName ibaho */}
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
