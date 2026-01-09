import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./pages/Landing";
import ArticlePage from "./pages/ArticlePage";
import AddNews from "./pages/AuthorDashboard";
import CategoryPage from "./pages/CategoryPage";
import AdsSection from "./components/AdsSection";
import TV from "./components/TV";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from './pages/AboutUs';
import OurMission from './pages/OurMission';
import OurVision from './pages/OurVision';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
export default function App(){
  return (
    <Router>
     <AuthProvider>
     <Routes>
  <Route path="/" element={<Landing/>} />
  <Route path="/category/:name" element={<CategoryPage/>} />
  <Route path="/article/:id" element={<ArticlePage/>} />
 <Route path="/login" element={<Login />} />
 <Route path="/about" element={<AboutUs />} />
 <Route path="/mission" element={<OurMission />} />
 <Route path="/vision" element={<OurVision />} />
 <Route path="/terms" element={<TermsOfService />} />
 <Route path="/privacy" element={<PrivacyPolicy />} />
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
              <PrivateRoute roles={["author"]}>
                <AuthorDashboard />
              </PrivateRoute>
            }
          />
  <Route path="/tv" element={<TV/>} />
  <Route path="/ads" element={<AdsSection/>} />
  
</Routes>
 </AuthProvider>
    </Router>
  );
}
