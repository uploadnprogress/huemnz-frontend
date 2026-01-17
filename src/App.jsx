import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import GatewayPage from './pages/GatewayPage'; // Correct Import
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import FAQPage from './pages/FAQPage';
import AllowlistPage from './pages/AllowlistPage';
import './App.css';

// Wallet Connection Component
const WalletConnect = ({ onConnect, userData }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onConnect(accounts[0]);
      } catch (error) {
        console.error("Connection failed", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  return (
    <button onClick={connectWallet} className="wallet-btn">
      {userData?.wallet 
        ? `${userData.wallet.substring(0, 6)}...${userData.wallet.substring(userData.wallet.length - 4)}`
        : "Connect Wallet"}
    </button>
  );
};

function App() {
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // --- PERSISTENCE FIX: Runs once on load ---
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      console.log("User already logged in:", savedEmail);
      setUserData(prev => ({ ...prev, email: savedEmail }));
      // If currently on Gateway, move to Home
      if (location.pathname === '/') {
        navigate('/home');
      }
    }
  }, []);

  const handleEnter = (email) => {
    localStorage.setItem('userEmail', email); 
    setUserData(prev => ({ ...prev, email }));
  };

  const handleWalletConnect = (wallet) => {
    setUserData(prev => ({ ...prev, wallet }));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Show header on EVERY page except root ('/')
  const showHeader = location.pathname !== '/';

  return (
    <div className="app-container">
      {showHeader && (
        <header className="main-header">
          <div className="logo" onClick={() => navigate('/home')}>HUEMNZ</div>
          
          <nav className="desktop-nav">
            <Link to="/about">About</Link>
            <Link to="/vision">Vision</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/allowlist" className="nav-highlight">Game</Link>
            <WalletConnect onConnect={handleWalletConnect} userData={userData} />
          </nav>

          <div className="mobile-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {isMenuOpen && (
            <div className="mobile-nav">
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/vision" onClick={closeMenu}>Vision</Link>
              <Link to="/faq" onClick={closeMenu}>FAQ</Link>
              <Link to="/allowlist" onClick={closeMenu}>Game</Link>
              <div style={{marginTop: '20px'}}>
                 <WalletConnect onConnect={handleWalletConnect} userData={userData} />
              </div>
            </div>
          )}
        </header>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<GatewayPage onEnter={handleEnter} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/allowlist" element={<AllowlistPage />} context={{ userData }} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;