import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';

// Import Layout Components & Pages
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import AllowlistPage from './pages/AllowlistPage';
import ContactPage from './pages/ContactPage';
import VisionPage from './pages/VisionPage';

// This is the main site layout. The <Outlet> component is a placeholder
// where the correct page (HomePage, AboutPage, etc.) will be rendered by the router.
const MainLayout = ({ userData }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a' }}>
    <Header />
    <main style={{ flex: 1 }}>
      {/* We pass userData down to the child routes via the Outlet's context */}
      <Outlet context={{ userData }} />
    </main>
    <Footer />
  </div>
);

function App() {
  const [userData, setUserData] = useState(() => {
    // On initial load, try to get user data from localStorage
    const savedData = localStorage.getItem('huemnzUserData');
    return savedData ? JSON.parse(savedData) : null;
  });
  
  const navigate = useNavigate();

  // This function is called from the Landing page form
  const handleEnter = (formData) => {
    console.log('User has entered with data:', formData);
    // Save the user's data to localStorage to "remember" them
    localStorage.setItem('huemnzUserData', JSON.stringify(formData));
    setUserData(formData);
    navigate('/'); // Navigate to the main site
  };

  return (
    <Routes>
      <Route path="/welcome" element={<Landing onEnter={handleEnter} />} />

      {/* If userData exists, render the main site layout. Otherwise, redirect to welcome. */}
      <Route 
        element={userData ? <MainLayout userData={userData} /> : <Navigate to="/welcome" replace />}
      >
        {/* All routes inside here will be rendered within the MainLayout's <Outlet> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/allowlist" element={<AllowlistPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      
      {/* Fallback for any unmatched URL */}
      <Route path="*" element={<Navigate to={userData ? "/" : "/welcome"} replace />} />
    </Routes>
  );
}

export default App;