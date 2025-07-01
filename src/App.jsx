import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Page Components
import Landing from './Landing'; // CORRECTED PATH
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import AllowlistPage from './pages/AllowlistPage';
import ContactPage from './pages/ContactPage';
import VisionPage from './pages/VisionPage';

// This component provides the main site layout with Header and Footer
const MainLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a' }}>
    <Header />
    <main style={{ flex: 1 }}>
      {/* Outlet renders the matched child route (e.g., HomePage, AboutPage) */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('huemnzUserData');
    return savedData ? JSON.parse(savedData) : null;
  });
  
  const navigate = useNavigate();

  const handleEnter = (formData) => {
    console.log('User has entered with data:', formData);
    localStorage.setItem('huemnzUserData', JSON.stringify(formData));
    setUserData(formData);
    navigate('/');
  };
  
  // A helper to pass the userData prop to components that need it
  const withUserData = (Component) => <Component userData={userData} />;

  return (
    <Routes>
      <Route path="/welcome" element={<Landing onEnter={handleEnter} />} />

      {/* If userData exists, render the main site layout, otherwise redirect to welcome */}
      <Route element={userData ? <MainLayout /> : <Navigate to="/welcome" replace />}>
        <Route path="/" element={withUserData(HomePage)} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/allowlist" element={withUserData(AllowlistPage)} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vision" element={<VisionPage />} />
      </Route>
      
      {/* Fallback for any unmatched URL */}
      <Route path="*" element={<Navigate to={userData ? "/" : "/welcome"} replace />} />
    </Routes>
  );
}

export default App;