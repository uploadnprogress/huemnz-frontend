import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import logoImg from '../assets/Huemnz_Logo.jpg'; 
import styles from './Header.module.css';

const Header = ({ onConnect, walletAddress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 1. Create a reference to the menu HTML element
  const menuRef = useRef(null);

  // 2. Add "Click Outside" Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open, and the click is NOT inside the menu or the hamburger icon
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Attach listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    if (location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/home');
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src={logoImg} alt="HUEMNZ" className={styles.logoImage} />
      </div>

      {/* DESKTOP NAV */}
      <nav className={styles.desktopNav}>
        <span className={styles.navLink} onClick={() => handleNavClick('/about')}>About</span>
        <span className={styles.navLink} onClick={() => handleNavClick('/vision')}>Vision</span>
        <span className={styles.navLink} onClick={() => handleNavClick('/faq')}>FAQ</span>
        <span className={`${styles.navLink} ${styles.disabledLink}`}>Mint <small>(Soon)</small></span>
        <button className={styles.gameButton} onClick={() => handleNavClick('/allowlist')}>
          Allowlist Game
        </button>
      </nav>

      {/* HAMBURGER ICON */}
      <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMenuOpen && (
        // 3. Attach the ref here so we know where the menu "boundary" is
        <div className={styles.mobileMenu} ref={menuRef}>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/about')}>About</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/vision')}>Vision</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/faq')}>FAQ</button>
          <button className={`${styles.mobileBtn} ${styles.disabledMobileBtn}`} disabled>Mint (Soon)</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/allowlist')}>Allowlist Game</button>
          
          <button className={styles.mobileBtn} onClick={() => { onConnect(); setIsMenuOpen(false); }}>
             {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;