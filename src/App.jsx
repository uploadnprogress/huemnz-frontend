import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header'; // The global header

// Pages
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import AllowlistPage from './pages/AllowlistPage';
import VisionPage from './pages/VisionPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import MintPage from './pages/MintPage';

// Layout Component: Renders Header + Page Content
const Layout = ({ userData }) => {
  return (
    <>
      <Header />
      {/* Add margin so content isn't hidden behind fixed header */}
      <div style={{ marginTop: '80px' }}>
        <Outlet context={{ userData }} />
      </div>
    </>
  );
};

function App() {
  const [userData, setUserData] = useState({
    email: '',
    wallet: ''
  });

  const handleLogin = (email) => {
    // Generate mock wallet for soft launch/game
    const mockWallet = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    setUserData({ email: email, wallet: mockWallet });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page has NO Header */}
        <Route path="/" element={<Landing onEnter={handleLogin} />} />
        
        {/* All other pages HAVE the Header */}
        <Route element={<Layout userData={userData} />}>
          <Route path="/home" element={userData.email ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/allowlist" element={<AllowlistPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/mint" element={<MintPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;