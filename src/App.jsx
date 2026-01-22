import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// IMPORT THE NEW COMPONENT (This enables the Orange Buttons)
import Header from './components/Header'; 

// Import Pages
import GatewayPage from './pages/GatewayPage'; 
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import FAQPage from './pages/FAQPage';
import AllowlistPage from './pages/AllowlistPage';

// Import Global CSS
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserData(prev => ({ ...prev, email: savedEmail }));
      if (location.pathname === '/') {
        navigate('/home');
      }
    }
  }, []);

  const handleEnter = (email) => {
    localStorage.setItem('userEmail', email); 
    setUserData(prev => ({ ...prev, email }));
  };

  const handleWalletConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserData(prev => ({ ...prev, wallet: accounts[0] }));
      } catch (error) {
        console.error("Connection failed", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  const showHeader = location.pathname !== '/';

  return (
    <div className="app-container">
      {/* CRITICAL FIX: 
         We removed the hardcoded <header> code that was breaking the styling.
         Now we use the <Header /> component which has the "Orange Pill" buttons.
      */}
      {showHeader && (
        <Header 
          onConnect={handleWalletConnect} 
          walletAddress={userData?.wallet} 
        />
      )}

      <div className="page-content" style={{ marginTop: showHeader ? '80px' : '0' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<GatewayPage onEnter={handleEnter} />} />
            <Route path="/home" element={<HomePage userData={userData} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/allowlist" element={<AllowlistPage userData={userData} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;