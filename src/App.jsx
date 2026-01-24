import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages Rusange
import Landing from "./pages/Landing";
import CategoryPage from "./pages/CategoryPage";
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import OurVision from "./pages/OurVision";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// Components Zikoresha Props (TV na Ads zikoreshwa muri Landing.jsx)

// Authentication Pages & Tools
import { AuthProvider } from "./context/AuthContext";
import SingleArticlePage from './pages/SingleArticlePage';
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import AdminDashboard from "./pages/AdminDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import PrivateRoute from "./components/PrivateRoute"; 
// PrivateRoute igenzura 'user' na 'role' mbere yo kwinjiza

export default function App(){
  return (
    <BrowserRouter>
     <AuthProvider>
       <Routes>
          {/* Inzira Rusange (Public Routes) */}
          <Route path="/" element={<Landing/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/mission" element={<OurMission />} />
          <Route path="/vision" element={<OurVision />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
         <Route path="/category/:categoryName" element={<CategoryPage />} />
           <Route path="/article/:id" element={<SingleArticlePage />} />
          
          {/* Inzira za Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          
          {/* Inzira Zirinzwe (Private Routes - zigenzura role) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/author"
            element={
              <PrivateRoute roles={["writer"]}> {/* Role muri DB ni 'writer' */}
                <AuthorDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
     </AuthProvider>
    </BrowserRouter>
  );
}
