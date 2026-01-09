// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import ArticlePage from "./pages/ArticlePage";
// import CategoryPage from "./pages/CategoryPage";

// import AdsSection from "./components/AdsSection";
// import TV from "./components/TV";

// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import AuthorDashboard from "./pages/AuthorDashboard";

// import AboutUs from "./pages/AboutUs";
// import OurMission from "./pages/OurMission";
// import OurVision from "./pages/OurVision";
// import TermsOfService from "./pages/TermsOfService";
// import PrivacyPolicy from "./pages/PrivacyPolicy";

// import PrivateRoute from "./components/PrivateRoute";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* Public pages */}
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />

//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/mission" element={<OurMission />} />
//           <Route path="/vision" element={<OurVision />} />
//           <Route path="/terms" element={<TermsOfService />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />

//           <Route path="/category/:name" element={<CategoryPage />} />
//           <Route path="/article/:id" element={<ArticlePage />} />

//           <Route path="/tv" element={<TV />} />
//           <Route path="/ads" element={<AdsSection />} />

//           {/* Protected pages */}
//           <Route
//             path="/admin"
//             element={
//               <PrivateRoute roles={["admin"]}>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/author"
//             element={
//               <PrivateRoute roles={["author"]}>
//                 <AuthorDashboard />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


// src/AppContainer.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext'; // Injiza NewsProvider

import Landing from "./pages/Landing";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";

import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import OurVision from "./pages/OurVision";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// Components zose zikenera Navbar/Footer cyangwa Ibindi bikoresha Context
// Twahisemo kuzishyira hano muri AppContainer
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdsSection from './components/AdsSection'; // Niba ikenewe hano

function App() {
  return (
    // Ubu NewsProvider igose ibindi byose
    <NewsProvider>
      <AuthProvider>
        {/* Navbar na Footer biragoseye n'ubuhinduzi byose bigakora */}
        <Navbar /> 
        <main> {/* Twongereho main tag kugirango style zikore neza */}
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/mission" element={<OurMission />} />
            <Route path="/vision" element={<OurVision />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />

            {/* <Route path="/tv" element={<TV />} /> TV yari component ya kera? */}
            <Route path="/ads" element={<AdsSection />} />

            {/* Protected pages */}
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
          </Routes>
        </main>
        <Footer /> {/* Footer nayo igosewe neza */}
      </AuthProvider>
    </NewsProvider>
  );
}

export default App;

